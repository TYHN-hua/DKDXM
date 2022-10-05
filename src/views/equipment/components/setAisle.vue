<template>
  <el-dialog title="货道设置" width="70%" :visible.sync="outerVisible" :before-close="handleClose">
    <el-card class="box-card">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="18">
          <div>
            <el-row>
              <el-col :span="6">
                货道行数：
              </el-col>
              <el-col :span="6">
                货道列数：
              </el-col>
              <el-col :span="6">
                货道容量（个）：
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-row>
              <el-col :span="4">
                <el-button type="primary" size="medium" @click="smartBtn">智能排货</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card-fotter">
      <el-row>
        <el-col v-for="(item,index) in channelList" :key="index" :span="5">
          <div style="width:100%; height:135px; text-align:center; background-color:#f6f7fb; position:relative;">
            <el-image :src="`${item.sku !== null ? item.sku.skuImage : urls}`" style="width: 84px; height: 78px" />
            <h4>{{ item.sku !== null ? item.sku.brandName : '暂无商品' }}</h4>
            <div class="item">{{ item.channelCode }}</div>
          </div>
          <div style="width:100%; height:40px; text-align:center">
            <el-button type="text" @click="addSkuBtn">添加</el-button>
            <el-button type="text" style="color:red" @click="del">删除</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="智能排货" width="60%" :visible.sync="innerVisible" append-to-body :before-close="closeBtn">
      <el-row>
        <el-col>
          <p>该区域属于学校商圈适合销售一下商品：</p>
        </el-col>
        <el-col v-for="(item,index) in businessList" :key="index" :span="5">
          <div style="width:100%; height:135px; text-align:center; background-color:#f6f7fb; position:relative;">
            <el-image ref="img" :src="item.image" style="width: 84px; height: 78px" />
            <h4>{{ item.skuName }}</h4>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="3">
          <el-button type="warning" @click="closeBtn">采纳建议</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="选择商品" width="60%" :visible.sync="goodsVisible" append-to-body>
      <div>
        <div v-for="(item,index) in skuList" :key="index" class="block">
          <el-image style="width: 84px; height: 78px" :src="item.skuImage" />
          <p>{{ item.brandName }}</p>
        </div>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="channelBtn">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTenGoods, channelConfig, getSkuList } from '@/api/equipment'
export default {
  props: {
    outerVisible: {
      type: Boolean,
      default: false
    },
    channelList: {
      type: Array,
      default: () => ([])
    },
    businessId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      goodsVisible: false,
      innerVisible: false,
      urls: 'data:image/png;base64,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',
      businessList: [],
      skuList: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:outerVisible', false)
    },
    closeBtn() {
      this.innerVisible = false
    },
    del() {
      this.$refs.img.url = this.urls
      console.log(this.$refs.img)
    },
    async smartBtn() {
      const res = await getTenGoods({ businessId: this.businessId })
      // console.log(res)
      this.businessList = res.data
      this.innerVisible = true
    },
    async channelBtn() {
      console.log(this.channelList)
      const arrList = []
      this.channelList.forEach((item) => {
        arrList.push({ channelCode: item.channelCode, skuId: item.skuId })
      })
      // console.log(arrList)
      const res = await channelConfig({ innerCode: this.channelList[0].innerCode, channelList: arrList })
      // console.log(res)
      if (res.data === true) {
        this.$message.success('货道配置成功')
      }
      this.handleClose()
    },
    async addSkuBtn() {
      const res = await getSkuList()
      console.log(res)
      this.skuList = res.data.currentPageRecords
      this.goodsVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 42px;
  height: 23px;
  background-color: #829bed;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 23px;
  border-bottom-right-radius:20px ;
  border-top-right-radius:20px ;
}
.box-card-fotter {
  height: 380px;
  overflow-y: scroll;
}
.box {
  width: 100%;
  .box-header {
    width: 20%;
  }
}
</style>
