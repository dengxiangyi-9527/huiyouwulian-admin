<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true">
        <el-form-item label="会员电话">
          <el-input placeholder="请输入会员电话" @blur="getDataList()" @keyup.enter.native="getDataList()"
            suffix-icon="el-icon-phone" v-model="dataForm.memberPhone" style="width:160px;"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="会员名称">
          <el-input placeholder="请输入会员名称" @blur="getDataList()" @keyup.enter.native="getDataList()"
            v-model="dataForm.memNm" style="width:160px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input placeholder="请输入设备编号" @blur="getDataList()" @keyup.enter.native="getDataList()"
            v-model="dataForm.deviceId1" style="width:160px;" clearable>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="会员名称">
          <el-select v-model="dataForm.memberId" placeholder="选择会员" @change="getDataList()">
            <el-option v-for="item in memberList" :key="item.realName" :label="item.realName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="getOnePageDataList()">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="avue-crud">
        <el-table :data="dataList" border v-loading="dataListLoading">
          <el-table-column prop="memberNm" header-align="center" align="center" label="会员名称" >
          </el-table-column>
          <el-table-column prop="memberNickNm" header-align="center" align="center" label="会员昵称" >
          </el-table-column>
          <!-- <el-table-column prop="applyId" header-align="center" align="center" label="申请人ID">
          </el-table-column> -->
          <el-table-column prop="memberPhone" header-align="center" align="center" label="手机号" >
          </el-table-column>
          <el-table-column prop="memDevNum" header-align="center" align="center" label="投资数量(台)"
            width="155">
          </el-table-column>
          <el-table-column prop="memProfitsTotal" header-align="center" align="center"
            label="总收益（元）" width="155">
          </el-table-column>
          <el-table-column prop="deviceId" header-align="center" align="center" label="设备编号"
            width="155">
          </el-table-column>
          <el-table-column prop="investDevType" header-align="center" align="center" label="匹配方式" :formatter="investDevTypeFormatter"
            width="155">
          </el-table-column>
          <el-table-column prop="memDevProfitsTotal" header-align="center" align="center"
            label="设备收益(元)" width="155">
          </el-table-column>

          <el-table-column header-align="center" align="center" width="240" label="操作"
            fixed="right">
            <template slot-scope="scope">

              <el-button icon="el-icon-plus" size="mini" type="success"
                @click="addOrUpdateHandle(scope.row)">查看</el-button>
              <el-button icon="el-icon-edit" size="mini" type="success"
                @click="handleUpdateDevice(scope.row)">更改设备</el-button>
              <!-- <el-button v-if="permissions.assets_applymachine_del" type="text" size="small"
                icon="el-icon-delete" @click="deleteHandle(scope.row.id)">删除</el-button> -->
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
      <!-- 弹窗, 新增 / 修改 -->
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList">
      </table-form>
      <el-dialog title="更改设备" :visible.sync="visible">
        <el-form :model="dataForm" ref="dataForm"
                  @keyup.enter.native="dataFormSubmit()" label-width="150px">
          <el-form-item label="会员名称" prop="memberNm">
            <el-input v-model="dataForm.memberNm" placeholder="会员名称" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="设备编号" prop="deviceId">
            <el-input v-model="dataForm.deviceId" placeholder="设备编号" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="新设备编号">
            <el-input v-model="value" placeholder="请输入新设备编号"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>
        </span>
      </el-dialog>
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
import { fetchList, getMemberList, getDeviceData } from '@/api/profits/revenue'
import TableForm from './revenue-form'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        key: '',
        applyName: '',
        applyPhone: '',
        reName: '',
        memberPhone: '',
        // memberId: null,
        memberNm: '',
        memberId: '',
        deviceId: '',
        deviceId1:''
      },
      value:'',
      dataList: [],
      totalCount: 0,
      memberList: [],
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
//      ,this.MemberList()
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
        page: this.pageIndex,
        limit: this.pageSize,
        // memberId: this.dataForm.memberId,
        memberPhone: this.dataForm.memberPhone,
        memNm: this.dataForm.memNm,
        deviceId: this.dataForm.deviceId1,
      })).then(response => {
        this.dataList = response.data.page.list
        this.totalPage = response.data.page.totalPage
        this.totalCount = response.data.page.totalCount
      })
      this.dataListLoading = false
    },
    MemberList () {
//      this.dataListLoading = true
      getMemberList(Object.assign({

      })).then(res => {
        // console.log(res)
        this.memberList = res.data.data;
        this.memberList.unshift({ "realName": "所有", "userId": null });
      })

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
      // console.log(row)
      let memberId = row.memberId
      let deviceId = row.deviceId
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(memberId, deviceId)
      })
    },
    investDevTypeFormatter(row, column){
      let investDevType = row.investDevType
      if (investDevType === 2) {
        return '定投'
      } else {
        return '随机匹配'
      }
    },
    handleUpdateDevice(row) {
      this.value = ''
      this.visible = true
      this.dataForm.memberNm = row.memberNm
      this.dataForm.memberId = row.memberId
      this.dataForm.deviceId = row.deviceId
    },
    dataFormSubmit() {
      this.dataForm = { ...this.dataForm, newDevId: this.value}
      getDeviceData(this.dataForm).then((res) => {
        if(res.data.msg != 'success') {
          this.$message.error(res.data.msg)
        }else {}
        this.getDataList()
        this.visible = false
      })
    }
    ,getOnePageDataList () {
      this.pageIndex = 1;
      this.getDataList();
    }
    // 删除

  }
}
</script>
