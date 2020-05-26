#!/bin/bash
# @Author: Just be free
# @Date:   2020-05-26 16:15:41
# @Last Modified by:   Just be free
# @Last Modified time: 2020-05-26 16:37:59

# 字符串首字母转换成大写
toFirstLetterUpper() {
  str=$1
  firstLetter=`echo ${str:0:1} | awk '{print toupper($0)}'`
  otherLetter=${str:1}
  result=$firstLetter$otherLetter
  echo $result
}
# 字符串转驼峰命名法
function camelize {
  str=$1
  result=""
  array=(${str//-/ })
  for i in ${array[@]}; do
    upperCase=$(toFirstLetterUpper $i)
    result=$result$upperCase
  done
  echo $result
}
# name=name-age-hh-ddd-dddd
# camelize $name
# get prefix of the component lib name
function getPrefix {
  config_file="./.env.production"
  prefix=`sed -n 2p $config_file`
  echo ${prefix#*=}
}

# toFirstLetterUpper $prefix
prefix=$(toFirstLetterUpper `getPrefix`)
echo "======================================"
echo ""
echo "Prefix of this component lib = $prefix"
echo ""
echo "======================================"

function excludeArray {
  array=("modules" "mixins" "theme")
  result=false
  for i in ${array[*]}; do
    if [ $1 == $i ];then
      result=true
    fi
  done
  echo $result
}
function combine {
  cat src/template.js build/tmp.js > src/index.js
}
function init {
  echo "" > build/tmp.js
  dirArr=`ls $1`
  prefix=$2
  for i in $dirArr
  do
    sub_dir="$1$i"
    exclude=$(excludeArray $i)
    if [[ -d "$sub_dir" && $exclude == false ]];then
      name=$(camelize $i)
      echo "$name component was compeleted!"
      echo "export { $name as $prefix$name };" >> build/tmp.js
    fi
  done
  combine
  echo "======================================"
  echo ""
  echo "DONE !!!"
  echo ""
  echo "======================================"
}
dir="src/"
init $dir $prefix


