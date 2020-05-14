/*
 * @Author: Just be free
 * @Date:   2020-01-15 17:16:53
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-13 18:33:54
 */
import { defineComponent } from "../modules/component";
import { renderedMixins } from "../mixins/rendered";
import { isPromise, throttle, isChineseCharacters } from "../modules/utils";
import { error } from "../modules/error";
import YnPopup from "../yn-popup";
import YnIconfont from "../yn-iconfont";
import YnFlex from "../yn-flex";
import YnFlexItem from "../yn-flex-item";
import YnSpin from "../yn-spin";
const CACHED_ALPHA_BETA = {};
export default defineComponent({
  name: "CityPicker",
  mixins: [renderedMixins],
  components: { YnFlex, YnFlexItem, YnPopup, YnIconfont, YnSpin },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "标题"
    },
    column: {
      type: [Number, String],
      default: 4,
      validator: c => {
        return String(c) === "4" || String(c) === "3";
      }
    },
    parse: {
      type: Function,
      default: city => {
        return city.CityName;
      }
    },
    limited: {
      type: Boolean,
      default: false
    },
    limitedData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tabs: {
      type: Array,
      default: () => {
        return [
          { label: "中国", key: "mainland-china" },
          { label: "非中国大陆(国际/港澳台)", key: "overseas" }
        ];
      }
    },
    searchable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "请输入城市名称"
    },
    showHistory: {
      type: Boolean,
      default: false
    },
    showHotCity: {
      type: Boolean,
      default: true
    },
    search: {
      type: Object,
      default: () => {
        return {
          params: {},
          action: () => {
            return Promise.resolve();
          },
          parse: e => {
            return e;
          }
        };
      }
    },
    history: {
      type: Object,
      default: () => {
        return {
          params: {},
          action: () => {
            return Promise.resolve();
          },
          parse: e => {
            return e;
          },
          title: "历史查询"
        };
      }
    },
    hotCity: {
      type: Object,
      default: () => {
        return {
          params: {},
          action: () => {
            return Promise.resolve();
          },
          parse: e => {
            return e;
          },
          title: "热门城市"
        };
      }
    },
    alphaBeta: {
      type: Object,
      default: () => {
        return {
          params: {},
          action: () => {
            return Promise.resolve();
          },
          parse: e => {
            return e;
          },
          title: "按字母查询"
        };
      }
    }
  },
  data() {
    return {
      isCompose: false,
      caculatedTabs: [],
      currentTab: {},
      selectedAlphaBeta: "",
      alphaBetaCities: [],
      hotCityList: [],
      historyList: [],
      searchList: [],
      historyLoading: false,
      alphaBetaLoading: false,
      hotCityLoading: false,
      isSearching: false,
      keywords: ""
    };
  },
  watch: {
    tabs: {
      handler() {
        this.caculatedTabs = [];
        this.tabs.forEach((tab, index) => {
          let active;
          if (index === 0) {
            active = true;
            this.currentTab = tab.key;
          } else {
            active = false;
          }
          this.caculatedTabs.push({ ...tab, active });
        });
      },
      immediate: true
    }
  },
  methods: {
    beforeEnter() {
      if (this.showHistory) {
        this.getHistory(this.currentTab);
      }
      if (!this.limited && this.showHotCity) {
        this.getHotCity(this.currentTab);
      }
      this.$emit("beforeEnter");
    },
    afterEnter() {
      this.$emit("afterEnter");
    },
    beforeLeave() {
      this.$emit("beforeLeave");
    },
    afterLeave() {
      this.$emit("afterLeave");
    },
    handleChange(e) {
      this.$emit("input", e);
    },
    handlePick(e) {
      if (this.isSearching) {
        // 搜索完结果后，点击结果需清空档次搜索记录
        this.clearSearchKeywords();
      }
      this.handleChange(false);
      this.$emit("pick", e);
    },
    clearSearchKeywords() {
      this.isSearching = false;
      this.keywords = "";
      this.$refs.searchInput.value = "";
    },
    clearSearchResult() {
      this.searchList = [];
    },
    onComposeStart() {
      this.isCompose = true;
    },
    onComposeEnd(e) {
      this.isCompose = false;
      this.handleOnSearch(e);
    },
    handleOnSearch(e) {
      if (this.isCompose) return;
      throttle(this.searchRequest)(e);
    },
    searchRequest(e) {
      const value = e.target.value.trim();
      this.keywords = value;
      if (value) {
        this.isSearching = true;
      } else {
        this.isSearching = false;
        // 内容为空， 不搜索
        return;
      }
      const params = { ...this.search.params, tab: this.currentTab, value };
      const promise = this.search.action(params);
      promise
        .then(res => {
          const data = this.search.parse(res, params);
          if (data && data.length) {
            this.searchList = data;
          }
        })
        .catch(err => {
          this.searchList = [];
          if (err.errmsg) {
            this.Toast(err.errmsg);
          } else {
            this.print(err);
          }
        });
    },
    close() {
      this.$emit("input", false);
    },
    getHistory(e) {
      const params = { ...this.history.params, tab: e };
      const promise = this.history.action(params);
      if (isPromise(promise)) {
        this.historyLoading = true;
        promise.then(res => {
          const data = this.history.parse(res, params);
          if (data && data.length) {
            this.historyList = data;
          }
          this.historyLoading = false;
        });
      } else {
        error("The action of hotCity's attribute must be a Promise type!");
      }
    },
    getHotCity(e) {
      const params = { ...this.hotCity.params, tab: e };
      const promise = this.hotCity.action(params);
      if (isPromise(promise)) {
        this.hotCityLoading = true;
        promise.then(res => {
          const data = this.hotCity.parse(res, params);
          if (data && data.length) {
            this.hotCityList = data;
          }
          this.hotCityLoading = false;
        });
      } else {
        error("The action of hotCity's attribute must be a Promise type!");
      }
    },
    handleClickAlphaBeta(e) {
      if (this.selectedAlphaBeta === e) {
        return false;
      }
      this.selectedAlphaBeta = e;
      this.alphaBetaCities = [];
      if (CACHED_ALPHA_BETA[e] && CACHED_ALPHA_BETA[e].length) {
        this.alphaBetaLoading = false;
        this.alphaBetaCities = CACHED_ALPHA_BETA[e];
      } else {
        this.alphaBetaLoading = true;
        const params = { ...this.alphaBeta.params, alphaBeta: e };
        const promise = this.alphaBeta.action(params);
        if (isPromise(promise)) {
          promise.then(res => {
            const data = this.alphaBeta.parse(res, params);
            if (data && data.length) {
              CACHED_ALPHA_BETA[e] = data;
              this.alphaBetaCities = data;
              this.setAlphaBetaScrollTop();
            }
            this.alphaBetaLoading = false;
          });
        } else {
          error("The action of alphaBeta's attribute must be a Promise type!");
        }
      }
    },
    setAlphaBetaScrollTop() {
      if (this.limited || this.isSearching) {
        return false;
      }
      this.rendered(() => {
        const scrollElement = this.$refs[`scrollElement-${this.currentTab}`]
          .$el;
        const lastChild = scrollElement.lastElementChild;
        scrollElement.scrollTop = lastChild.offsetTop;
      });
    },
    handleTabSwitch(ele) {
      if (ele.active) {
        return false;
      }
      this.clearSearchResult();
      this.caculatedTabs.forEach(tab => {
        if (tab.key === ele.key) {
          tab.active = true;
          if (this.showHistory) {
            this.getHistory(tab.key);
          }
          if (!this.limited && this.showHotCity) {
            this.getHotCity(tab.key);
          }
        } else {
          tab.active = false;
        }
      });
      this.currentTab = ele.key;
    },
    createTitle(h) {
      return h("span", { class: ["yn-city-picker-header-title"] }, this.title);
    },
    creteHeaderArea(h) {
      const header = [];
      header.push(this.createTitle(h));
      header.push(this.createClose(h));
      if (this.caculatedTabs.length === 2) {
        header.push(
          h(
            "yn-flex",
            {
              props: { justifyContent: "spaceAround" },
              class: ["yn-city-picker-tab-bar"]
            },
            Array.apply(null, this.caculatedTabs).map((ele, key) => {
              return h(
                "yn-flex-item",
                {
                  key,
                  on: { click: this.handleTabSwitch.bind(this, ele) },
                  props: { flex: 1 },
                  class: ["yn-city-picker-tab-item", ele.active ? "active" : ""]
                },
                [h("span", { class: ["yn-city-picker-tab-text"] }, ele.label)]
              );
            })
          )
        );
      }
      header.push(this.creteInputSearchArea(h));
      return header;
    },
    createHistoryArea(h) {
      if (this.showHistory) {
        return [
          this.historyList.length > 0
            ? this.createBlockTitle(h, this.history.title)
            : null,
          this.createBlock(h, {
            cities: this.historyList,
            loading: this.historyLoading
          })
        ];
      } else {
        return [];
      }
    },
    createInputSearchList(h) {
      return h(
        "ul",
        {},
        Array.apply(null, this.searchList).map((list, key) => {
          const innerHTML = this.parse(list, "search-result").replace(
            new RegExp(this.keywords, "ig"),
            `<i>${this.keywords}</i>`
          );
          return h("li", { key, on: { click: this.handlePick.bind(this, list) } }, [
            h("span", { domProps: { innerHTML } }, [])
          ]);
        })
      );
    },
    createHotCityArea(h) {
      if (this.showHotCity) {
        return [
          this.createBlockTitle(h, this.hotCity.title),
          this.createBlock(h, {
            cities: this.hotCityList,
            loading: this.hotCityLoading
          })
        ];
      } else {
        return [];
      }
    },
    createAlphaBeta(h) {
      return [
        this.createBlockTitle(h, this.alphaBeta.title),
        h(
          "yn-flex",
          {
            props: { flexWrap: "wrap", justifyContent: "spaceBetween" },
            class: ["yn-city-picker-alpha-beta"]
          },
          Array.apply(null, { length: 26 }).map((i, key) => {
            const char = String.fromCharCode(65 + key);
            return h(
              "yn-flex-item",
              {
                on: { click: this.handleClickAlphaBeta.bind(this, char) },
                class: [
                  "alpha-beta",
                  this.selectedAlphaBeta === char ? "active" : ""
                ]
              },
              char
            );
          })
        )
      ];
    },
    creteInputSearchArea(h) {
      if (this.searchable) {
        return h(
          "yn-flex",
          {
            props: { justifyContent: "spaceBetween" },
            class: ["yn-city-picker-input-search"]
          },
          [
            h("yn-flex-item", { class: ["icon-box"] }, [
              h(
                "yn-iconfont",
                { props: { name: "iconsearch", size: "16" } },
                []
              )
            ]),
            h("yn-flex-item", { class: ["input-box"], props: { flex: 1 } }, [
              h(
                "input",
                {
                  on: {
                    input: this.handleOnSearch,
                    compositionstart: this.onComposeStart,
                    compositionend: this.onComposeEnd
                  },
                  attrs: { placeholder: this.placeholder },
                  ref: "searchInput"
                },
                []
              )
            ]),
            h(
              "yn-flex-item",
              {
                on: { click: this.clearSearchKeywords },
                class: ["delete-all"],
                directives: [{ name: "show", value: this.isSearching }]
              },
              [
                h(
                  "yn-iconfont",
                  { props: { name: "iconclear-button", size: 16 } },
                  []
                )
              ]
            )
          ]
        );
      }
    },
    createSearchedArea(h) {
      return this.createBlock(h, {
        cities: this.alphaBetaCities,
        loading: this.alphaBetaLoading
      });
    },
    createClose(h) {
      return h(
        "yn-iconfont",
        {
          class: ["yn-city-picker-close"],
          props: { name: "iconcancle_circle", size: 24 },
          on: { click: this.close }
        },
        []
      );
    },
    createBlockTitle(h, title = "") {
      return h("div", { class: ["yn-city-picker-block-title"] }, [
        h("span", {}, title)
      ]);
    },
    textOverflow(text = "") {
      if (!isChineseCharacters(text)) {
        return [];
      }
      const length = text.length;
      if (length > 4) {
        if (length === 5) {
          return ["text-small"];
        } else {
          return ["text-small", "normal-lineheight"];
        }
      } else {
        return [];
      }
    },
    createBlock(h, args) {
      const { cities, loading } = args;
      if (loading) {
        return h("div", { class: ["yn-city-picker-searched-area"] }, [
          h("yn-spin", { props: { type: "tripleBounce", size: 30 } }, [])
        ]);
      } else {
        return h(
          "yn-flex",
          {
            props: { flexWrap: "wrap", justifyContent: "spaceBetween" },
            class: "yn-city-picker-cities"
          },
          [
            Array.apply(null, cities).map((city, key) => {
              return h(
                "yn-flex-item",
                {
                  key,
                  on: { click: this.handlePick.bind(this, city) },
                  class: [
                    "city-item",
                    `column-${this.column}`,
                    ...this.textOverflow(this.parse(city))
                  ]
                },
                [h("span", {}, this.parse(city))]
              );
            })
          ]
        );
      }
    },
    createBodyArea(h) {
      const body = [];
      body.push(...this.createHistoryArea(h));
      body.push(...this.createHotCityArea(h));
      body.push(...this.createAlphaBeta(h));
      body.push(this.createSearchedArea(h));
      return body;
    },
    createDynamicContent(h) {
      if (this.limited) {
        return [
          h("yn-flex-item", { class: ["yn-city-picker-header"] }, [
            this.createTitle(h),
            this.createClose(h)
          ]),
          h("yn-flex-item", { props: { flex: 1 } }, [
            this.createBlock(h, { cities: this.limitedData })
          ])
        ];
      } else {
        return [
          h(
            "yn-flex-item",
            { class: ["yn-city-picker-header"] },
            this.creteHeaderArea(h)
          ),
          h(
            "yn-flex-item",
            {
              directives: [
                {
                  name: "show",
                  value:
                    !this.isSearching && this.currentTab === "mainland-china"
                }
              ],
              class: ["yn-city-picker-body"],
              props: { flex: 1 },
              ref: "scrollElement-mainland-china"
            },
            [this.createBodyArea(h)]
          ),
          h(
            "yn-flex-item",
            {
              directives: [
                {
                  name: "show",
                  value: !this.isSearching && this.currentTab === "overseas"
                }
              ],
              class: ["yn-city-picker-body"],
              props: { flex: 1 },
              ref: "scrollElement-overseas"
            },
            [this.createBodyArea(h)]
          ),
          h(
            "yn-flex-item",
            {
              class: [
                "yn-city-picker-body",
                "yn-city-picker-input-search-result"
              ],
              directives: [{ name: "show", value: this.isSearching }],
              props: { flex: 1 },
              ref: "scrollElement-searching"
            },
            [this.createInputSearchList(h)]
          ),
          h("yn-flex-item", { class: ["yn-city-picker-footer"] }, [])
        ];
      }
    }
  },
  render(h) {
    return h("div", { class: ["yn-city-picker"] }, [
      h(
        "yn-popup",
        {
          on: {
            input: this.handleChange,
            beforeEnter: this.beforeEnter,
            afterEnter: this.afterEnter,
            beforeLeave: this.beforeLeave,
            afterLeave: this.afterLeave
          },
          props: { position: "bottom" },
          style: { height: "90%" },
          directives: [{ name: "show", value: this.value }]
        },
        [
          h(
            "yn-flex",
            {
              class: ["yn-city-picker-content", this.limited ? "limited" : ""],
              props: { flexDirection: "column" }
            },
            this.createDynamicContent(h)
          )
        ]
      )
    ]);
  }
});
