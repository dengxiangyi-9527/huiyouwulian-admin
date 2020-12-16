<template>

  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-button v-if="permissions.assets_manualorder_add" icon="el-icon-plus" type="primary"
            @click="addOrUpdateHandle()">新增</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" @keyup.enter.native="getDataList()">
        <el-form-item label="运营商姓名">
          <el-input placeholder="请输入姓名" suffix-icon="el-icon-search" v-model="dataForm.realName"
            style="width:150px;">
          </el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="dataForm.status" placeholder="选择状态" @change="getDataList()">
            <el-option v-for="item in changeStatusList" :key="item.value" :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="请输入电话" suffix-icon="el-icon-phone" v-model="dataForm.mobile"
            style="width:150px;">
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="直接推荐人手机号">
          <el-input placeholder="请输入电话" suffix-icon="el-icon-phone" v-model="dataForm.referrerPhone"
            style="width:150px;">
          </el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading">
          <el-table-column header-align="center" type="index" align="center" label="序号">
          </el-table-column>
          <el-table-column prop="price" header-align="center" align="center" label="价格">
          </el-table-column>
          <el-table-column prop="residueNumber" header-align="center" align="center" label="剩余数量">
          </el-table-column>
          <!-- <el-table-column prop="memberId" header-align="center" align="center" label="会员ID">
          </el-table-column> -->
          <el-table-column prop="realName" width="100" header-align="center" align="center"
            label="真实姓名">
          </el-table-column>
          <el-table-column prop="mobile" width="150" header-align="center" align="center"
            label="手机号码">
          </el-table-column>
          <!-- <el-table-column prop="addUser" header-align="center" align="center" label="添加人ID">
          </el-table-column> -->
          <el-table-column prop="addUserName" header-align="center" width="150" align="center"
            label="添加人用户名">
          </el-table-column>
          <el-table-column prop="addTime" width="180" header-align="center" align="center"
            label="添加时间">
          </el-table-column>
          <el-table-column prop="status" header-align="center" :formatter="statusFormatter"
            align="center" label="审核状态">
          </el-table-column>
          <el-table-column prop="updateTime" width="200" header-align="center" align="center"
            label="审核时间">
          </el-table-column>
          <el-table-column prop="updateUser" header-align="center" align="center" label="审核人">
          </el-table-column>
          <el-table-column prop="updateUserName" header-align="center" width="100" align="center"
            label="审核人姓名">
          </el-table-column>
          <el-table-column prop="reason" width="200" header-align="center" align="center"
            label="拒绝理由">
          </el-table-column>
          <!-- <el-table-column prop="type" header-align="center" :formatter="typeFOrmatter"
            align="center" label="类型">
          </el-table-column>
          <el-table-column prop="buyerMobile" header-align="center" width="200" align="center"
            label="购买者手机">
          </el-table-column>
          <el-table-column prop="buyerRealName" header-align="center" width="180" align="center"
            label="购买人姓名">
          </el-table-column> -->
          <el-table-column header-align="center" align="center" width="200" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status==0&&permissions.assets_manualorder_audit"
                type="warning" size="small" icon="el-icon-edit"
                @click="addOrUpdateHandle(scope.row.id)" v-db-click>审核</el-button>
              <el-button v-if="scope.row.status!=0" type="primary" size="small" icon="el-icon-edit"
                @click="addOrUpdateHandle(scope.row.id)">查看</el-button>
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
import { fetchList, delObj } from '@/api/device/manualorder'
import TableForm from './manualorderSuppl-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        mobile: '',
        realName: '',
        status: ''
      },
      changeStatusList: [{ lable: '所有', value: null }, { lable: '待审核', value: 0 }, { lable: '成功', value: 1 }, { lable: '驳回', value: 2 },],
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
  mounted () {

  },
  methods: {
    closeDialog () {
      console.log('111')
      this.$nextTick(() => {
        this.$refs['addOrUpdate'].clearValidate()
      })
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      fetchList(Object.assign({
        current: this.pageIndex,
        size: this.pageSize,
        type: 3,
        status: this.dataForm.status,
        realName: this.dataForm.realName,
        mobile: this.dataForm.mobile
      })).then(response => {
        console.log(response)
        this.dataList = response.data.data.records
        this.totalPage = response.data.data.total
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
      console.log(this.addOrUpdateVisible)
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
        return delObj(id)
      }).then(data => {
        this.$message.success('删除成功')
        this.getDataList()
      })
    },
    statusFormatter (row) {
      let status = row.status
      if (status == 0) {
        return '待审核'
      } else if (status == 1) {
        return '审核通过'
      } else {
        return '不通过'
      }
    },
    typeFOrmatter (row) {
      let type = row.type
      if (type == 1) {
        return '自用'
      } else if (type == 2) {
        return '他用'
      }
    }
  }
}

</script>
