<template>
  <div class="pagination">
    <button
        
      :disabled="pageNo == 1"
      @click="$emit('getPageNo', pageNo - 1)"
    >
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{active:pageNo==1}"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo==page}"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo==totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      
      :disabled="pageNo == startNumAndEndNum.end"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      //总共多少页 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      //计算出连续的页码其实数字和结束数字
      let start = 0;
      let end = 0;
      //不正常现象，总页数没有连续页码多
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        //正常现象，总页数一定大于5
        start = this.pageNo - Math.floor(this.continues / 2);
        //例如当前页为8，连续页为5，开始页面就是5，取整直接去除小数
        end = this.pageNo + Math.floor(this.continues / 2);
      }
      //如果出现了0或者负数
      if (start < 1) {
        start = 1;
        end = this.continues;
      }
      //end大于总页码
      if (end > this.totalPage) {
        end = this.totalPage;
        start = this.totalPage - this.continues + 1;
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
