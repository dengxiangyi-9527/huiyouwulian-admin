<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true">
        <el-form-item label="申请人姓名">
          <el-input placeholder="请输入申请人姓名" @blur="getDataList()" @keyup.enter.native="getDataList()"
            suffix-icon="el-icon-search" v-model="dataForm.applyName" style="width:160px;"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="申请人电话">
          <el-input placeholder="请输入申请人电话" @keyup.enter.native="getDataList()"
            suffix-icon="el-icon-phone" v-model="dataForm.applyPhone" style="width:160px;"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="收货人姓名">
          <el-input placeholder="请输入收货人姓名" @blur="getDataList()" @keyup.enter.native="getDataList()"
            suffix-icon="el-icon-search" v-model="dataForm.reName" style="width:160px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="收货人电话">
          <el-input placeholder="请输入收货人电话" @blur="getDataList()" @keyup.enter.native="getDataList()"
            suffix-icon="el-icon-phone" v-model="dataForm.rePhone" style="width:160px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="dataForm.status" placeholder="选择状态" @change="getDataList()">
            <el-option v-for="item in statusList" :key="item.value" :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading"
          :row-class-name="tableRowClassName">
          <el-table-column prop="id" header-align="center" align="center" label="ID">
          </el-table-column>
          <el-table-column prop="applyName" header-align="center" align="center" label="申请人">
          </el-table-column>
          <!-- <el-table-column prop="applyId" header-align="center" align="center" label="申请人ID">
          </el-table-column> -->
          <el-table-column prop="applyMobile" header-align="center" width="120" align="center"
            label="申请电话">
          </el-table-column>
          <el-table-column prop="addTime" header-align="center" align="center" label="申请时间"
            width="155">
          </el-table-column>
          <el-table-column prop="updateTime" header-align="center" align="center" label="更新时间"
            width="155">
          </el-table-column>
          <el-table-column prop="status" :formatter="statusFormatter" header-align="center"
            align="center" label="状态">
          </el-table-column>
          <el-table-column prop="reason" header-align="center" align="center" label="审批理由"
            width="200">
          </el-table-column>
          <el-table-column prop="address" header-align="center" align="center" label="详细地址">
          </el-table-column>
          <el-table-column prop="area" header-align="center" align="center" label="地区" width="200">
          </el-table-column>
          <el-table-column prop="rePhone" header-align="center" align="center" label=" 收货人手机号"
            width="120">
          </el-table-column>
          <el-table-column prop="reName" header-align="center" align="center" label="收货人姓名">
          </el-table-column>
          <el-table-column header-align="center" align="center" width="120" label="操作"
            fixed="right">
            <template slot-scope="scope">
              <el-button    v-if="scope.row.status==0 && permissions.assets_applymachine_edit" type="warning" size="mini" icon="el-icon-edit"
                @click="addOrUpdateHandle(scope.row.id)">审核</el-button>
              <el-button v-if="scope.row.status!=0" icon="el-icon-plus" size="mini" type="success"
                @click="addOrUpdateHandle(scope.row.id)">查看</el-button>
              <!-- <el-button v-if="permissions.assets_applymachine_del" type="text" size="small"
                icon="el-icon-delete" @click="deleteHandle(scope.row.id)">删除</el-button> -->
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
<style >
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
<script>
import { fetchList, delObj } from '@/api/device/applymachine'
import TableForm from './applymachine-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        key: '',
        applyName: '',
        applyPhone: '',
        reName: '',
        rePhone: '',
        status: null
      },
      dataList: [],
      statusList: [{ lable: '所有', value: null }, { lable: '待审批', value: 0 }, { lable: '通过', value: 1 }, { lable: '拒绝', value: 2 }],
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
  activated () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      fetchList(Object.assign({
        current: this.pageIndex,
        size: this.pageSize,
        applyName: this.dataForm.applyName,//申请人姓名
        applyMobile: this.dataForm.applyPhone,//申请人电话
        reName: this.dataForm.reName,//收货人姓名
        rePhone: this.dataForm.rePhone,//收货人电话
        status: this.dataForm.status
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
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    statusFormatter (row, column) {
      let status = row.status
      if (status === 0) {
        return '待审批'
      } else if (status === 1) {
        return '通过'
      } else if (status === 2) {
        return '拒绝'
      }
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.status === 0) {
        return 'warning-row';
      } else if (row.status === 2) {
        return 'success-row';
      }
      return '';
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
    }
  }
}
</script>
