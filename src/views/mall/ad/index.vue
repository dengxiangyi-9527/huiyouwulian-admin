<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-button v-if="permissions.mall_ad_add" icon="el-icon-plus" type="primary"
            @click="addOrUpdateHandle()">新增</el-button>
        </el-form-item>
      </el-form>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading">         
          <el-table-column prop="name" header-align="center" align="center" label="广告图名称">
          </el-table-column>
          <el-table-column prop="content" header-align="center" width="300" align="center"
            label="广告图简介">
          </el-table-column>
          <el-table-column header-align="center" align="center" label="广告图图片">
            <template v-slot="scope">
              <img v-if="scope.row.url" :src="scope.row.url" style="width:60px; height:60px;">
            </template>
          </el-table-column>
          <el-table-column :formatter="enabledFormatter" prop="enabled" header-align="center" align="center" label="状态">
          </el-table-column>
       <!--   <el-table-column prop="sortOrder" header-align="center" align="center" label="排序">
          </el-table-column>
          <el-table-column prop="floorPrice" header-align="center" align="center" label="低价">
          </el-table-column>-->

          <el-table-column header-align="center" align="center" width="240" label="操作">
            <template slot-scope="scope">
              <el-button v-if="permissions.mall_ad_edit" type="primary" size="small"
                @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
              <el-button v-if="permissions.mall_ad_delete" type="danger" size="small"
                @click="deleteHandle(scope.row.id)">删除</el-button>
              <el-button v-if="scope.row.enabled == 0" type="primary" size="small" @click="enabledHandle(scope.row.id,scope.row.enabled)">启用</el-button>
              <el-button v-if="scope.row.enabled == 1" type="warning" size="small" @click="enabledHandle(scope.row.id,scope.row.enabled)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="avue-crud__pagination">
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
          :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
          :total="totalPage" background layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList">
      </table-form>
    </basic-container>
  </div>
</template>

<script>
import { listBrand, deleteBrand, enabledObj } from '@/api/mall/ad'
import TableForm from './mallbrand-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  components: {
    TableForm
  },
  created () {
    this.getDataList()
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      listBrand(Object.assign({
        page: this.pageIndex,
        limit: this.pageSize
      })).then(response => {
        console.log(response)
        const { list, totalCount } = response.data.page
        this.dataList = list
        this.totalPage = totalCount 
      })
      this.dataListLoading = false
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      this.$confirm('是否确认删除ID为' + id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return deleteBrand(id)
      }).then(data => {
        this.$message.success('删除成功')
        this.getDataList()
      })
    },
    enabledFormatter (row, column) {
      let enabled = row.enabled
      if (enabled === 1) {
        return '启用'
      } else if (enabled === 0) {
        return '禁用'
      }
    },
    enabledHandle(id,data) {
      if(data == 1) {
        data = 0
      } else if (data == 0) {
        data = 1
      }
      enabledObj(id,data).then( res => {
        this.getDataList()
      })
    }
  }
}
</script>
<style lang="stylus" scoped></style>