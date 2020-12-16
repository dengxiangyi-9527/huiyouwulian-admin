<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>体验水商品选择<span class="neccsary">（*必填）</span>
        <el-button type="success" :plain="true" @click="selGoods">选择商品</el-button>
      </h3>
      <el-table :data="addGoodsList" style="width: 100%;">
        <el-table-column property="name" width="400" label="名称" align="center" />
        <el-table-column property="url" width="400" label="图片" align="center">
          <template slot-scope="scope">
            <img v-if="scope.row.url" :src="scope.row.url" width="40">
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="400"
                         class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleGoodsDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <h3>赠品商品选择<span class="neccsary">（*必填）</span>
        <el-button type="success" :plain="true" @click="selGiveGoods">选择赠品</el-button>
      </h3>
      <el-table :data="addGiveGoodsList" style="width: 100%;">
        <el-table-column property="name" width="400" label="名称" align="center" />
        <el-table-column property="url" width="400" label="图片" align="center">
          <template slot-scope="scope">
            <img v-if="scope.row.url" :src="scope.row.url" width="40">
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作"  width="400"
                         class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleGiveGoodsDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <el-form>
        <el-form-item label="有效截止日期" prop="time">
          <el-date-picker
            v-model="time"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="赠品商品数量" prop="number">
          <el-input v-model="number" style="width:220px;" placeholder="请输入大于0的数字"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish" v-db-click>提交</el-button>
    </div>

    <!-- 商品弹窗 -->
    <el-dialog :visible.sync="goodsDialogVisible" title="商品套餐选择">
      <div class="filter-container">
        <el-form :data="nameInfo">
          <el-input class="filter-item" style="width: 200px;" v-model="nameInfo.info"
                    @blur="changeName(nameInfo.info)" @keyup.enter.native="searchSingleGoods"
                    placeholder="请输入商品名称" />
          <el-button class="filter-item1" type="primary" icon="el-icon-search"
                     @click="searchSingleGoods">查找
          </el-button>
        </el-form>
      </div>
      <div class="avue-crud">
        <el-table border style="width: 100%;" v-loading="listLoading" :data="dataList">
          <el-table-column prop="name" header-align="center" align="center" label="名称">
          </el-table-column>
          <el-table-column prop="url" header-align="center" align="center" label="图片">
            <template slot-scope="scope">
              <img v-if="scope.row.url" :src="scope.row.url" width="40">
            </template>
          </el-table-column>
          <el-table-column prop="specifications" header-align="center" align="center" label="规格">
          </el-table-column>
          <el-table-column prop="price" header-align="center" align="center" label="价格">
          </el-table-column>
          <el-table-column prop="calnumber" header-align="center" align="center" label="计算量">
          </el-table-column>
          <el-table-column align="center" label="操作" width="100"
                           class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="addGoods(scope.row)" v-db-click>添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="avue-crud__pagination">
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                       :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
                       :total="totalCount" background layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goodsDialogVisible = false" type="primary">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 赠品弹窗 -->
    <el-dialog :visible.sync="giveGoodsDialogVisible" title="商品套餐选择">
      <div class="filter-container">
        <el-form :data="nameInfo">
          <el-input class="filter-item" style="width: 200px;" v-model="nameInfo.info"
                    @blur="changeName(nameInfo.info)" @keyup.enter.native="searchSingleGoods"
                    placeholder="请输入商品名称" />
          <el-button class="filter-item1" type="primary" icon="el-icon-search"
                     @click="searchSingleGoods">查找
          </el-button>
        </el-form>
      </div>
      <div class="avue-crud">
        <el-table border style="width: 100%;" v-loading="listLoading" :data="dataList">
          <el-table-column prop="name" header-align="center" align="center" label="名称">
          </el-table-column>
          <el-table-column prop="url" header-align="center" align="center" label="图片">
            <template slot-scope="scope">
              <img v-if="scope.row.url" :src="scope.row.url" width="40">
            </template>
          </el-table-column>
          <el-table-column prop="specifications" header-align="center" align="center" label="规格">
          </el-table-column>
          <el-table-column prop="price" header-align="center" align="center" label="价格">
          </el-table-column>
          <el-table-column prop="calnumber" header-align="center" align="center" label="计算量">
          </el-table-column>
          <el-table-column align="center" label="操作" width="100"
                           class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="addGiveGoods(scope.row)" v-db-click>添加
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="avue-crud__pagination">
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                       :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
                       :total="totalCount" background layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giveGoodsDialogVisible = false" type="primary">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import { addObj } from  '@/api/mall/mallgoodsgive'
  import { uploadPath } from '@/api/admin/storage'
  import { getSingleList, publishSingleGoods } from '@/api/combo/goods'
  import { MessageBox } from 'element-ui'
 export default {
   data() {
     return {
       number:1,
       time: '',
       uploadPath,
       nameInfo: [{ info: null }],
       searchValue: null,
       pageSize: 10,
       pageIndex: 1,
       addGoodsList: [],
       addGiveGoodsList: [],
       attributeForm: { attribute: '', value: '' },
       attributeVisiable: false,
       attributes: [],
       listLoading: false,
       dataList: [],
       totalCount: 0,
       goods: {
         goodsGiveId: '',
         giveGoodsId: '',
         giveGoodsNumber: 1,
         goodsId: '',
         goodsName: '',
         giveGoodsName: '',
         goodsProductId: '',
         giveGoodsProductId: '',
         goodsPicUrl: '',
         giveGoodsPicUrl: '',
         createrId: '',
         createTm: '',
         validEndTime: '',
         tenantId: '',
       },
       goodsDialogVisible: false,
       giveGoodsDialogVisible: false,
       specifications: [{ specification: '规格', value: '标准', picUrl: '' }],
       products: [{ id: 0, specifications: ['标准'], price: 0.00, number: 0, calnumber: 0, url: '' }],
       attributes: [],
       list: [],
     }
   },
   created () {
     this.getSingleList()
   },
   methods: {
     selGoods () {
       this.goodsDialogVisible = true
     },
     selGiveGoods () {
       this.giveGoodsDialogVisible = true
     },
     uploadGoodsPicUrl: function (response) {
       this.goods.goodsPicUrl = response.data.url
       // this.goods = { ...this.goods, picUrl: response.data.url }
     },
     uploadGiveGoodsPicUrl: function (response) {
       this.goods.giveGoodsPicUrl = response.data.url
       // this.goods = { ...this.goods, picUrl: response.data.url }
     },
     getSingleList () {
       getSingleList({
         'searchvalue': this.searchValue,
         'limit': this.pageSize,
         'page': this.pageIndex
       }).then(res => {
         this.dataList = res.data.page.list
         this.totalPage = res.data.page.totalPage
         this.totalCount = res.data.page.totalCount
         this.listLoading = false
       })
     },
     submitForm (row) {
       let list = this.addGoodsList
       this.list = list
     },
     handleAttributeShow () {
       this.attributeForm = {}
       this.attributeVisiable = true
     },
     handleAttributeAdd () {
       this.attributes.unshift(this.attributeForm)
       this.attributeVisiable = false
     },
     handleAttributeDelete (row) {
       const index = this.attributes.indexOf(row)
       this.attributes.splice(index, 1)
     },
     searchSingleGoods () {
       this.getSingleList()
       // this.isShow = true
     },
     sizeChangeHandle (val) {
       this.pageSize = val
       this.pageIndex = 1
       this.getSingleList()
     },
     currentChangeHandle (val) {
       this.pageIndex = val
       this.getSingleList()
     },
     handleCancel: function () {
       this.$router.push({ path: '/mall/goodsgive/index' })
     },
     //添加
     addGoods (row) {
       // console.log(row)
       this.addGoodsList = []
       this.addGoodsList.push({ ...row })
       this.addGoodsList.map( item => {
         this.goods.goodsProductId = item.id
       })
       this.$notify({
         type: 'success',
         title: '成功',
         message: '添加成功'
       })
     },
     addGiveGoods (row) {
       // console.log(row)
       this.addGiveGoodsList = []
       this.addGiveGoodsList.push({ ...row })
       this.addGiveGoodsList.map( item => {
         this.goods.giveGoodsProductId = item.id
       })
       this.$notify({
         type: 'success',
         title: '成功',
         message: '添加成功'
       })
     },
     handleGoodsDelete (row) {
       const index = this.addGoodsList.indexOf(row)
       this.addGoodsList.splice(index, 1)
       // this.specToProduct()
     },
     handleGiveGoodsDelete (row) {
       const index = this.addGiveGoodsList.indexOf(row)
       this.addGiveGoodsList.splice(index, 1)
       // this.specToProduct()
     },
     handlePublish: function () {
       const finalGoods = {
         goodsGiveId: this.goods.goodsGiveId,
         goodsProductId: this.goods.goodsProductId,
         giveGoodsProductId: this.goods.giveGoodsProductId,
         giveGoodsNumber: this.number,
         validEndTime: this.time
       }
       addObj(finalGoods).then(response => {
         if (response.data.code === 0) {
           this.$notify.success({
             title: '成功',
             message: '创建成功'
           })
           this.$router.push({ path: '/mall/goodsgive/index' })
         } else {
           MessageBox.alert('业务错误：' + response.data.msg, '警告', {
             confirmButtonText: '确定',
             type: 'error'
           })
         }
       })
     },
   }
 }
</script>
<style>
  .avatar-uploader .el-upload {
    width: 145px;
    height: 145px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 145px;
    height: 145px;
    display: block;
  }
  .op-container{
    margin-top: 10px;
  }
</style>
