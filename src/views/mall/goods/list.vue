<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-form :inline="true" @keyup.enter.native="getList()">
        <el-form-item label="商品编号">
          <el-input v-model="listQuery.goodsSn" clearable class="filter-item" style="width: 200px;"
            placeholder="请输入商品编号" />
        </el-form-item>
        <el-form-item label=" 商品名称">
          <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;"
            placeholder="请输入商品名称" />
        </el-form-item>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找
        </el-button>
        <el-button class="filter-item" type="warning" icon="el-icon-edit" @click="handleCreate"
          v-db-click>
          添加
        </el-button>
      </el-form>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit
      highlight-current-row>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-form-item label="宣传画廊">
              <img v-for="pic in props.row.gallery" :key="pic" :src="pic" class="gallery">
            </el-form-item>
            <el-form-item label="商品介绍">
              <span>{{ props.row.brief }}</span>
            </el-form-item>
            <el-form-item label="商品单位">
              <span>{{ props.row.unit }}</span>
            </el-form-item>
            <el-form-item label="关键字">
              <span>{{ props.row.keywords }}</span>
            </el-form-item>
            <el-form-item label="类目ID">
              <span>{{ props.row.categoryId }}</span>
            </el-form-item>
            <el-form-item label="品牌商ID">
              <span>{{ props.row.brandId }}</span>
            </el-form-item>
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品编号" width="180" prop="goodsSn" />

      <el-table-column align="center" min-width="100" width="180" label="名称" prop="name" />

      <el-table-column align="center" property="iconUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" width="40">
        </template>
      </el-table-column>

      <el-table-column align="center" property="iconUrl" label="分享图">
        <template slot-scope="scope">
          <img :src="scope.row.shareUrl" width="40">
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情" prop="detail">
        <template slot-scope="scope">
          <el-dialog :visible.sync="detailDialogVisible" title="商品详情">
            <div v-html="goodsDetail" />
          </el-dialog>
          <el-button type="primary" size="mini" @click="showDetail(scope.row.detail)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="专柜价格" prop="counterPrice" />

      <el-table-column align="center" label="当前价格" prop="retailPrice" />

      <el-table-column align="center" label="是否新品" prop="isNew">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isNew ? 'success' : 'error' ">
            {{ scope.row.isNew ? '新品' : '非新品' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否热品" prop="isHot">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot ? 'success' : 'error' ">
            {{ scope.row.isHot ? '热品' : '非热品' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否在售" prop="isOnSale">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isOnSale ? 'success' : 'error' ">
            {{ scope.row.isOnSale ? '在售' : '未售' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="danger" size="small" @click="editPrice(scope.row)">更改价格</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"
      :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 更改价格弹框 -->
    <el-dialog :visible.sync="shipDialogVisible" title="更改价格">
      <el-form ref="shipForm" :model="shipForm" status-icon label-position="left"
        label-width="100px" style="width: 400px; margin-left:50px;" @refreshDataList="getList">
        <el-form-item label="名称" prop="name">
          <el-input v-model="shipForm.name" />
        </el-form-item>
        <el-form-item label="是否在售" prop="isOnSale">
          <el-radio-group v-model="shipForm.isOnSale">
            <el-radio :label="1">在售</el-radio>
            <el-radio :label="0">未售</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前价格" prop="retailPrice">
          <el-input v-model="shipForm.retailPrice" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="shipForm.sort" placeholder="0.00">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shipDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmShip" v-db-click>确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 100px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
.gallery {
  width: 80px;
  margin-right: 10px;
}
.filter-container {
  padding-left: 20px;
  padding-top: 20px;
  background-color: #fff;
}
</style>

<script>
import { listGoods, deleteGoods, editGoodsPrice } from '@/api/mall/goods'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'GoodsList',
  components: { BackToTop, Pagination },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        isCombo: 0,
        goodsSn: undefined,
        name: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      shipForm: {
        id: '',
        name: '',
        isOnSale: false,
        retailPrice: '',
        sort: 0,
      },
      goodsDetail: '',
      detailDialogVisible: false,
      downloadLoading: false,
      shipDialogVisible: false
    }
  },
  created () {
    this.getList()
  },
  activated () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      listGoods(this.listQuery, {

      }).then(response => {
        console.log(response)
        this.list = response.data.page.list
        this.total = response.data.page.totalCount
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate () {
      this.$router.push({ path: '/mall/create' });
    },
    handleUpdate (row) {
      this.$router.push({ path: '/mall/edit', query: { id: row.id } })
    },
    showDetail (detail) {
      this.goodsDetail = detail
      this.detailDialogVisible = true
    },
    handleDelete (row) {
      deleteGoods(row).then(response => {
        this.$confirm('确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
          this.getList()
        }).catch(response => {
          // console.log(response)
          this.$notify.error({
            title: '失败',
            message: '删除失败'
          })
        })
      })
    }
    , editPrice (row) {
      this.shipDialogVisible = true;
      this.shipForm.id = row.id
      this.shipForm.name = row.name
      this.shipForm.isOnSale = row.isOnSale
      this.shipForm.retailPrice = row.retailPrice
      this.shipForm.sort = row.sort
    }
    , confirmShip () {
      editGoodsPrice(this.shipForm).then(data => {
        if (data.data.code == 0) {
          this.shipDialogVisible = false
          this.$notify.success({
            title: '成功',
            message: '修改成功'
          })
          this.$emit('refreshDataList')
          this.getList()
        } else {
          this.$notify.error({
            title: '失败',
            message: data.data.msg
          })
        }

      })
    }
  }
}
</script>
