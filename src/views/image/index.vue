<template>
    <div class='container-image'>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div class="btn_box">
        <el-radio-group @change="changeCollect" v-model="filterParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true" >收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!filterParams.collect">
            <span  @click="toggleStatus(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span   @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页区域 -->
      <el-pagination background layout="prev, pager, next" :total="total"  :current-page="filterParams.page"
        :page-size="filterParams.per_page"
        @current-change="changePager"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选参数
      filterParams: {
        // false 全部 true 收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.filterParams })
      this.images = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getImages()
    },
    // 出来切换 全部与收藏
    changeCollect () {
      this.filterParams.page = 1
      this.getImages()
    },
    // 添加收藏 取消收藏
    async toggleStatus (item) {
      try {
        // 请求
        const {
          data: { data }
        } = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        })
        // 提示
        this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
        // 修改星星样式
        // 修改当前图片的数据，is_collected 值改成后台返回的值即可
        item.is_collected = data.collect
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    // 删除图片
    async delImage (id) {
      try {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除图片成功')
        this.getImages()
      } catch (e) {
        this.$message.error('删除图片失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn_box{
  margin-bottom: 20px;
}
.img_list {
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin: 0 15px 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      span {
        color: #fff;
        margin: 0 20px;
      }
      .red{
        color: red;
      }
    }
  }
}
</style>
