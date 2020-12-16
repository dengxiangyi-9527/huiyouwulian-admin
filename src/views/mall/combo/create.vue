<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>商品介绍</h3>
      <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goods.name" />
        </el-form-item>
        <el-form-item label="专柜价格" prop="counterPrice">
          <el-input v-model="goods.counterPrice" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="当前价格" prop="retailPrice">
          <el-input v-model="goods.retailPrice" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="货品数量" prop="number">
          <el-input v-model="goods.number" placeholder="0" />
        </el-form-item>
        <el-form-item label="产品类型" prop="productPowerType">
          <el-select v-model="goods.productPowerType">
            <el-option v-for="item in productPower" :key="item.id" :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="分享收益%" prop="shareProfitRatio">
          <el-input v-model="goods.shareProfitRatio"
            @blur="watchShareProfitRatio(goods.shareProfitRatio)" placeholder="请输入11-29之间" />
        </el-form-item>
        <el-form-item label="是否新品" prop="isNew">
          <el-radio-group v-model="goods.isNew">
            <el-radio :label="1">新品</el-radio>
            <el-radio :label="0">非新品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖" prop="isHot">
          <el-radio-group v-model="goods.isHot">
            <el-radio :label="0">普通</el-radio>
            <el-radio :label="1">热卖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否在售" prop="isOnSale">
          <el-radio-group v-model="goods.isOnSale">
            <el-radio :label="1">在售</el-radio>
            <el-radio :label="0">未售</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品图片" prop="picUrl">
          <el-upload :action="uploadPath" :show-file-list="false" :on-success="uploadPicUrl"
            class="avatar-uploader" accept=".jpg,.jpeg,.png,.gif">
            <img v-if="goods.picUrl" :src="goods.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="宣传画廊">
          <el-upload :action="uploadPath" :limit="5" :on-exceed="uploadOverrun"
            :on-success="handleGalleryUrl" :on-remove="handleRemove" multiple
            accept=".jpg,.jpeg,.png,.gif" list-type="picture-card">
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>

        <el-form-item label="商品单位">
          <el-input v-model="goods.unit" placeholder="件 / 个 / 盒" />
        </el-form-item>

        <el-form-item label="关键字">
          <el-tag v-for="tag in keywords" :key="tag" closable type="primary"
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input v-if="newKeywordVisible" ref="newKeywordInput" v-model="newKeyword"
            class="input-new-keyword" @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm" />
          <el-button v-else class="button-new-keyword" type="primary" @click="showInput">+ 增加
          </el-button>
        </el-form-item>

        <el-form-item label="所属分类" prop="categoryList">
          <el-cascader :options="categoryList" expand-trigger="hover"
            @change="handleCategoryChange" />
        </el-form-item>
        <el-form-item label="配送类型" prop="type">
          <el-select v-model="goods.type">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name"
              :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="所属品牌商" prop="brandId">
          <el-select v-model="goods.brandId">
            <el-option v-for="item in brandList" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="商品简介">
          <el-input v-model="goods.brief" />
        </el-form-item>

        <el-form-item label="商品详细介绍">
          <editor :init="editorInit" v-model="goods.detail" />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>商品套餐选择<span class="neccsary">（*必填）</span>
        <el-button type="success" :plain="true" @click="selCombo">选择套餐</el-button>
      </h3>
      <el-table :data="addGoodsList" style="width: 100%;">
        <el-table-column property="name" width="250" label="名称" />
        <el-table-column property="url" width="100" label="图片">
          <template slot-scope="scope">
            <img v-if="scope.row.url" :src="scope.row.url" width="40">
          </template>
        </el-table-column>
        <el-table-column property="specifications" width="100" label="规格" />
        <el-table-column property="price" width="100" label="价格" />
        <el-table-column property="calnumber" width="100" label="计算值" />
        <el-table-column property="totalNumber" width="150" label="总数">
          <template slot-scope="scope">
            <el-input clearable class="filter-item" style="width: 150px;"
              v-model="scope.row.totalNumber" @blur="submitForm(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100"
          class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleSpecificationDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card">
      <h3>商品参数</h3>
      <el-button :plain="true" type="primary" @click="handleAttributeShow" v-db-click>添加</el-button>
      <el-table :data="attributes">
        <el-table-column property="attribute" label="商品参数名称" />
        <el-table-column property="value" label="商品参数值" />
        <el-table-column align="center" label="操作" width="100"
          class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleAttributeDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="attributeVisiable" title="设置商品参数">
        <el-form ref="attributeForm" :model="attributeForm" status-icon label-position="left"
          label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="商品参数名称" prop="attribute">
            <el-input v-model="attributeForm.attribute" />
          </el-form-item>
          <el-form-item label="商品参数值" prop="value">
            <el-input v-model="attributeForm.value" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attributeVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleAttributeAdd" v-db-click>确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish" v-db-click>上架</el-button>
    </div>

    <!-- 套餐商品弹窗 -->
    <el-dialog :visible.sync="comboDialogVisible" title="商品套餐选择">
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
        <el-button @click="comboDialogVisible = false" type="primary">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
.el-card {
  margin-bottom: 10px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.input-new-keyword {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

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
</style>

<script>
import { publishGoods, listCatAndBrand, getSingleList, publishSingleGoods } from '@/api/combo/goods'
import { createStorage, uploadPath } from '@/api/admin/storage'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'


export default {
  name: 'GoodsCreate',
  components: { Editor },

  data () {
    return {
      uploadPath,
      comboDialogVisible: false,
      newKeywordVisible: false,
      newKeyword: '',
      keywords: [],
      dataList: [],
      addGoodsList: [],
      list: [],
      limit: 10,
      nameInfo: [{ info: null }],
      page: 1,
      searchValue: null,
      listLoading: false,
      pageSize: 10,
      totalPage: 0,
      isShow: false,
      pageIndex: 1,
      totalCount: 0,
      categoryList: [],
      typeList: [{ id: 1, name: '普通' }, { id: 2, name: '自配送' }, { id: 3, name: '茶吧机认领' }],
      productPower: [{ id: 0, name: '普通商品' }, { id: 2, name: '高级会员' }, { id: 3, name: '高级VIP' }, { id: 4, name: '线上运营商' }],
      brandList: [],
      goods: { picUrl: '', gallery: [], number: '', productPowerType: 0, calnumber: '', shareProfitRatio: '', },
      specVisiable: false,
      specForm: { specification: '', value: '', picUrl: '' },
      multipleSpec: false,
      specifications: [{ specification: '规格', value: '标准', picUrl: '' }],
      productVisiable: false,
      productForm: { id: 0, specifications: [], price: 0.00, number: 0, calnumber: 0, shareProfitRatio: 0.0, productPowerType: 0, url: '' },
      products: [{ id: 0, specifications: ['标准'], price: 0.00, number: 0, calnumber: 0, url: '' }],
      attributeVisiable: false,
      attributeForm: { attribute: '', value: '' },
      attributes: [],
      rules: {
        goodsSn: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        counterPrice: [{ required: true, message: '专柜价格不能为空', trigger: 'blur' }],
        retailPrice: [{ required: true, message: '当前价格不能为空', trigger: 'blur' }],
        productPowerType: [{ required: true }],
        calnumber: [{ required: true }],
        number: [{ required: true, message: '货品数量不能为空', trigger: 'blur' }],
        categoryList: [{ required: true, message: '所属分类不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '配送类型不能为空', trigger: 'blur' }],
        brandId: [{ required: true, message: '所属品牌商不能为空', trigger: 'blur' }],
        picUrl: [{ required: true, message: '图片不能为空', trigger: 'blur' }],
        shareProfitRatio: [{ required: true, message: '分享收益在11-29之间', trigger: 'blur' }],
        // type: [{ required: true }]
      },
      editorInit: {
        language: 'zh_CN',
        height: 500,
        convert_urls: false,
        plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        images_upload_handler: function (blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createStorage(formData).then(res => {
            success(res.data.data.url)
          }).catch(() => {
            failure('上传失败，请重新上传')
          })
        }
      }
    }
  },
  created () {
    this.init()
    this.getSingleList()
  },

  methods: {
    init: function () {
      listCatAndBrand().then(response => {
        this.categoryList = response.data.data.categoryList
        this.brandList = response.data.data.brandList
      })
    },
    selCombo () {
      this.comboDialogVisible = true
    },
    getSingleList () {
      this.listLoading = true
      console.log(this.nameInfo.info)
      getSingleList({
        'searchvalue': this.searchValue,
        'limit': this.pageSize,
        'page': this.pageIndex
      }).then(res => {
        console.log(res)
        this.dataList = res.data.page.list
        this.totalPage = res.data.page.totalPage
        this.totalCount = res.data.page.totalCount
        this.listLoading = false
      })
    },
    //每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getSingleList()
    },
    //当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getSingleList()
    },
    //监听
    submitForm (row) {
      let list = this.addGoodsList
      this.list = list
      console.log(this.list)
    },
    //查询
    searchSingleGoods () {
      this.getSingleList()
      // this.isShow = true
    },
    watchShareProfitRatio (val) {
      console.log(val)
      if (val < 11 || val > 29) {
        this.$message({
          message: '请输入11-29之间'
        })
        this.goods.shareProfitRatio = ''
      } else {
        this.goods.shareProfitRatio = val
      }

    },
    // nameChange (e) {
    //   console.log(e)
    // },
    //添加
    addGoods (row) {
      // console.log(row)
      this.addGoodsList.push({ ...row })
      this.$notify({
        type: 'success',
        title: '成功',
        message: '添加成功'
      })
    },
    changeName (val) {
      this.searchValue = val
    },
    handleCategoryChange (value) {
      this.goods.categoryId = value[value.length - 1]
    },
    handleCancel: function () {
      this.$router.push({ path: '/mall/goods/list' })
    },
    //上架
    handlePublish: function () {
      console.log(this.list)
      const finalGoods = {
        goods: this.goods,
        specifications: this.specifications,
        products: this.products,
        attributes: this.attributes,
        comboList: this.list
      }
      console.log('111', finalGoods)
      publishSingleGoods(finalGoods).then(response => {
        console.log(response)
        if (response.data.code === 0) {
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          })
          this.$router.push({ path: '/mall/combo/index' })
        } else {
          MessageBox.alert('业务错误：' + response.data.msg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    handleClose (tag) {
      this.keywords.splice(this.keywords.indexOf(tag), 1)
      this.goods.keywords = this.keywords.toString()
    },
    showInput () {
      this.newKeywordVisible = true
      this.$nextTick(_ => {
        this.$refs.newKeywordInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      const newKeyword = this.newKeyword
      if (newKeyword) {
        this.keywords.push(newKeyword)
        this.goods.keywords = this.keywords.toString()
      }
      this.newKeywordVisible = false
      this.newKeyword = ''
    },
    uploadPicUrl: function (response) {
      this.goods.picUrl = response.data.url
      // this.goods = { ...this.goods, picUrl: response.data.url }
    },
    uploadOverrun: function () {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
    handleGalleryUrl (response, file, fileList) {
      if (response.code === 0) {
        this.goods.gallery.push(response.data.url)
      }
    },
    handleRemove: function (file, fileList) {
      for (var i = 0; i < this.goods.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.goods.gallery[i] === url) {
          this.goods.gallery.splice(i, 1)
        }
      }
    },
    specChanged: function (label) {
      if (label === false) {
        this.specifications = [{ specification: '规格', value: '标准', picUrl: '' }]
        this.products = [{ id: 0, specifications: ['标准'], price: 0.00, number: 0, url: '' }]
      } else {
        this.specifications = []
        this.products = []
      }
    },
    uploadSpecPicUrl: function (response) {
      this.specForm.picUrl = response.data.url
    },
    handleSpecificationShow () {
      this.specForm = { specification: '', value: '', picUrl: '' }
      this.specVisiable = true
    },
    handleSpecificationAdd () {
      var index = this.specifications.length - 1
      for (var i = 0; i < this.specifications.length; i++) {
        const v = this.specifications[i]
        if (v.specification === this.specForm.specification) {
          if (v.value === this.specForm.value) {
            this.$message({
              type: 'warning',
              message: '已经存在规格值:' + v.value
            })
            this.specForm = {}
            this.specVisiable = false
            return
          } else {
            index = i
          }
        }
      }

      this.specifications.splice(index + 1, 0, this.specForm)
      this.specVisiable = false

      this.specToProduct()
    },
    handleSpecificationDelete (row) {
      const index = this.addGoodsList.indexOf(row)
      this.addGoodsList.splice(index, 1)
      // this.specToProduct()
    },
    specToProduct () {
      if (this.specifications.length === 0) {
        return
      }
      // 根据specifications创建临时规格列表
      var specValues = []
      var spec = this.specifications[0].specification
      var values = []
      values.push(0)

      for (var i = 1; i < this.specifications.length; i++) {
        const aspec = this.specifications[i].specification

        if (aspec === spec) {
          values.push(i)
        } else {
          specValues.push(values)
          spec = aspec
          values = []
          values.push(i)
        }
      }
      specValues.push(values)

      // 根据临时规格列表生产货品规格
      // 算法基于 https://blog.csdn.net/tyhj_sf/article/details/53893125
      var productsIndex = 0
      var products = []
      var combination = []
      var n = specValues.length
      for (var s = 0; s < n; s++) {
        combination[s] = 0
      }
      var index = 0
      var isContinue = false
      do {
        var specifications = []
        for (var x = 0; x < n; x++) {
          var z = specValues[x][combination[x]]
          specifications.push(this.specifications[z].value)
        }
        products[productsIndex] = { id: productsIndex, specifications: specifications, price: 0.00, number: 0, url: '' }
        productsIndex++

        index++
        combination[n - 1] = index
        for (var j = n - 1; j >= 0; j--) {
          if (combination[j] >= specValues[j].length) {
            combination[j] = 0
            index = 0
            if (j - 1 >= 0) {
              combination[j - 1] = combination[j - 1] + 1
            }
          }
        }
        isContinue = false
        for (var p = 0; p < n; p++) {
          if (combination[p] !== 0) {
            isContinue = true
          }
        }
      } while (isContinue)

      this.products = products
    },
    handleProductShow (row) {
      this.productForm = Object.assign({}, row)
      this.productVisiable = true
    },
    uploadProductUrl: function (response) {
      this.productForm.url = response.data.url
    },
    handleProductEdit () {
      for (var i = 0; i < this.products.length; i++) {
        const v = this.products[i]
        if (v.id === this.productForm.id) {
          this.products.splice(i, 1, this.productForm)
          break
        }
      }
      this.productVisiable = false
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
    }
  }
}
</script>
