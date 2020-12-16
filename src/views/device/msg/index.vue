<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item label="消息状态">
          <el-select v-model="dataForm.status" placeholder="选择状态">
            <el-option v-for="item in statusList" :key="item.value" :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading">
          <el-table-column prop="msgId" header-align="center" align="center" label="编号">
          </el-table-column>
          <!-- <el-table-column prop="msgKey" header-align="center" align="center" label="">
          </el-table-column> -->
          <el-table-column prop="msgStatus" header-align="center" :formatter="msgStatusFormatter"
            align="center" label="消息状态">
          </el-table-column>
          <!-- <el-table-column prop="msgType" header-align="center" :formatter="msgTypeFormatter"
            align="center" label="消息类型（1-系统消息，2-客户消息）">
          </el-table-column> -->
          <el-table-column prop="msgData" width="300" header-align="center" align="center"
            label="消息内容">
          </el-table-column>
          <el-table-column prop="createTime" header-align="center" align="center" label="创建时间">
          </el-table-column>
          <el-table-column prop="updateTime" header-align="center" align="center" label="处理时间">
          </el-table-column>
          <el-table-column header-align="center" align="center" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.msgStatus==0" type="primary" size="small"
                icon="el-icon-edit" @click="addOrUpdateHandle(scope.row)">点击处理</el-button>
              <!-- <el-button v-if="permissions.sys_sysmsg_del" type="text" size="small"
                icon="el-icon-delete" @click="deleteHandle(scope.row.msgId)">删除</el-button> -->
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
import { fetchList, delObj, putObj } from '@/api/device/sysmsg'
import TableForm from './msg-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dataForm: {
        key: '',
        status: null
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      statusList: [{ lable: '所有', value: null }, { lable: '待处理', value: 0 }, { lable: '已处理', value: 1 }]
    }
  },
  components: {
    TableForm
  },
  created () {
    this.getDataList()
  },
  activated () {
    this.getDataList()
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      fetchList(Object.assign({
        current: this.pageIndex,
        size: this.pageSize,
        msgStatus: this.dataForm.status
      })).then(response => {
        this.dataList = response.data.data.records
        console.log(this.dataList)
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
    addOrUpdateHandle (row) {
      console.log(row)
      let msgId = row.msgId
      let msgUserId = this.$store.state.user.userInfo.userId
      let msgStatus = row.msgStatus
      putObj({
        msgId: msgId,
        msgStatus: 1,
        msgUserId: msgUserId
      }).then(data => {
        console.log(data)
        if (data.data.code == 0) {
          this.$message.success('成功')
          this.getDataList()
        } else {
          this.$message.error(data.data.msg)
        }
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

    //状态处理
    msgStatusFormatter (row, column) {
      let status = row.msgStatus
      if (status === 0) {
        return '待处理'
      } else if (status === 1) {
        return '已处理'
      }
    }
  }
}
</script>
