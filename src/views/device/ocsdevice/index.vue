
<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="会员">
        <el-input v-model="dataForm.key" placeholder="名称/手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="dataForm.deviceId" placeholder="设备编号" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="dataForm.status" placeholder="选择状态">
          <el-option v-for="item in statusList" :key="item.value" :label="item.lable"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域" prop="updateTime">
        <el-cascader size="large" :options="options" v-model="dataForm.devAreaCode"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="绑定起始日期">
        <el-date-picker v-model="dataForm.bindStartDate" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择设备绑定起始日期" style="width:150px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="绑定截止日期">
        <el-date-picker v-model="dataForm.bindEndDate" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择设备绑定截止日期" style="width:150px">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="getOnePageDataList()" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading"
      @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50">
      </el-table-column>
      <el-table-column prop="id" header-align="center" align="center" label="序号">
      </el-table-column>
      <el-table-column prop="deviceId" header-align="center" align="center" label="设备编号">
      </el-table-column>
      <!--
      <el-table-column :formatter="profitsRefMemberidFormatter" prop="customerId"
        header-align="center" align="center" label="会员">
      </el-table-column>
      -->
      <el-table-column prop="customerNm" header-align="center" align="center" label="会员">
      </el-table-column>
      <el-table-column prop="deviceName" header-align="center" align="center" label="设备名称">
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="会员名称">
      </el-table-column>
      <el-table-column prop="phone" header-align="center" align="center" width="120" label="会员手机号">
      </el-table-column>
      <el-table-column prop="dateBind" header-align="center" width="155" align="center"
        label="绑定时间">
      </el-table-column>
      <el-table-column prop="area" header-align="center" width="150" align="center" label="区域">
      </el-table-column>
      <el-table-column prop="address" header-align="center" width="150" align="center" label="地址">
      </el-table-column>
      <el-table-column :formatter="userFloorFormatter" prop="userFloor" header-align="center"
        align="center" label="楼层">
      </el-table-column>
      <el-table-column :formatter="userLiftFormatter" prop="userLift" header-align="center"
        align="center" label="有无电梯">
      </el-table-column>
      <el-table-column prop="userQuantity" header-align="center" align="center" label="喝水人数">
      </el-table-column>
      <el-table-column prop="deviceIccidId" header-align="center" width="180" align="center"
        label="物联卡号">
      </el-table-column>
      <!--<el-table-column prop="online" header-align="center" align="center" :formatter="onlineFormatter" label="在线状态">-->
      <!--</el-table-column>-->
      <el-table-column prop="flowRemain" header-align="center" align="center" label="剩余流量(L)">
      </el-table-column>
      <el-table-column prop="flowUsed" header-align="center" align="center" label="已用流量(L)">
      </el-table-column>
      <el-table-column prop="dateSynchro" header-align="center" align="center" label="用水时间" >
      </el-table-column>
      <el-table-column prop="tdsJ" header-align="center" align="center" label="tds值">
      </el-table-column>
      <el-table-column prop="filter2Max" header-align="center" align="center" label="tds最大值">
      </el-table-column>
      <el-table-column :formatter="statusFormatter" prop="status" header-align="center"
        align="center" label="设备状态">
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="400" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" v-if="permissions.assets_ocsdevice_update"  @click="sendInstruct(scope.row.deviceId,'0a')"
            v-db-click>解绑
          </el-button>
          <el-button type="success" size="small" v-if="permissions.assets_ocsdevice_update"  @click="recharge(scope.row.deviceId)" v-db-click>充值
          </el-button>
          <el-button type="warning" size="small"  v-if="permissions.assets_ocsdevice_update" @click="tdsSetUp(scope.row.deviceId)" v-db-click>
            tds设置
          </el-button>
          <el-button type="warning" size="small"  v-if="permissions.assets_ocsdevice_update" @click="activationDev(scope.row.deviceId)" v-db-click>
            激活
          </el-button>
          <!--
          <el-button type="primary" size="small" @click="statusRead(scope.row.deviceId)">状态查询
          </el-button>
          -->
          <el-button type="primary" size="small"
            @click="queryRechargeRecordListHandle(scope.row.deviceId)">充值记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
      :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
      :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList">
    </add-or-update>

    <!-- 订单详情对话框 -->
    <el-dialog :visible.sync="rechargeRecordVisible" title="充值记录" width="800">
      <section ref="print">
        <el-table :data="devRechargeRecordList" border style="width: 100%;">
          <el-table-column prop="deviceId" header-align="center"  align="center" label="设备编号">
          </el-table-column>
          <el-table-column prop="createTm" header-align="center"  align="center" label="充值时间">
          </el-table-column>
          <el-table-column prop="rechargeFlow" header-align="center"  align="center" label="充值流量">
          </el-table-column>
          <el-table-column :formatter="rechargeStatusFormatter" prop="rechargeStatus"
            header-align="center" align="center" label="充值状态">
          </el-table-column>
          <el-table-column prop="updateTm" header-align="center" align="center" label="充值完成时间">
          </el-table-column>
          <el-table-column prop="residueFlow" header-align="center" align="center" label="剩余流量">
          </el-table-column>
        </el-table>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeRecordVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>r

<script>
import { fetchList, delObj, memberList, edornUrl, adornUrl, validOnLine, queryRechargeRecordList } from '@/api/device/ocsdevice';
import TableForm from './device-form';
import { mapGetters } from 'vuex';
import { regionData } from 'element-china-area-data';
export default {
  data () {
    return {
      dataForm: {
        key: '',
        profitsRefMemberid: null,
        deviceId: null,
        status: null,
        devAreaCode: [],
        bindEndDate: null,
        bindStartDate: null,
      },
      dataList: [],
      devRechargeRecordList: [],
      options: regionData,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      rechargeRecordVisible: false,
      profitsRefMemberidList: [],
      statusList: [{ lable: '所有', value: null }, { lable: '出厂测试', value: 0 }, { lable: '正常', value: 1 }, { lable: '欠费', value: 2 },
      { lable: '传感器故障', value: 3 }, { lable: '关机', value: 4 }, { lable: '待激活', value: 6 }, { lable: '流量计故障', value: 7 },
      { lable: '频发数据', value: 8 }, { lable: '缺水', value: 11 }, { lable: '锁定', value: 12 }, { lable: 'TDS值报警', value: 13 },
      { lable: '离线', value: -1 },
      ]
    }
  },
  components: {
    TableForm,
  },
  created () {
    this.getDataList()
  },
  activated () {
    this.getMemberList();
    this.getDataList()
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      // console.log(this.dataForm.status)
      fetchList({
        page: this.pageIndex,
        limit: this.pageSize,
        key: this.dataForm.key,
        customerId: this.dataForm.profitsRefMemberid,
        deviceId: this.dataForm.deviceId,
        status: this.dataForm.status,
        devAreaCode: this.dataForm.devAreaCode[this.dataForm.devAreaCode.length - 1],
        bindStartDate: this.dataForm.bindStartDate,
        bindEndDate: this.dataForm.bindEndDate,
      }).then(response => {
        // console.log(response)
        this.dataList = response.data.page.list
        this.totalPage = response.data.page.totalCount
        // console.log(this.totalPage)
      })
      this.dataListLoading = false
    },
    // 每页数
    sizeChangeHandle (val) {
      // console.log(val)
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      // console.log('当前页', this.pageIndex)
      this.getDataList()
    },
    //多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
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
        return delObj(id)
      }).then(data => {
        this.$message.success('删除成功')
        this.getDataList()
      })
    },
    getMemberList () {
      memberList({
      }).then(({ data }) => {
        // console.log('会员名称', data)
        if (data && data.code === 0) {
          this.profitsRefMemberidList = data.data
        }
      })
    }
    //会员名字
    , profitsRefMemberidFormatter (row, column) {
      let profitsRefMemberid = row.customerId;
      let nicknameArr = this.profitsRefMemberidList.map(item => {
        // console.log(profitsRefMemberid)
        // console.log(item)
        if (profitsRefMemberid == item.userId) {
          return item.nickname;
        }
      });
      return nicknameArr;
    }, statusFormatter (row, column) {
      let status = row.status;
      let statusNameArr = this.statusList.map(item => {
        // console.log(item)
        if (status == item.value) {
          return item.lable;
        }
      });
      return statusNameArr;
    }, userFloorFormatter (row, column) {
      let userFloor = row.userFloor;
      // let userLift = row.userLift;
      if (userFloor === 0) {
        return '';
      }
      // return userFloor+"楼 "+ (userLift==0?"左":"右");
      return userFloor + "楼 ";
    }
    , userLiftFormatter (row, column) {
      let userLift = row.userLift;
      if (userLift === 1) {
        return '有';
      }
      return "无";
    },
    //解除绑定-》恢复出厂
    sendInstruct (deviceId, cmdStr) {
      let that = this
      let operatId = this.$store.state.user.userInfo.userId
      this.$confirm('确定解绑', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        adornUrl({
          "cmd": cmdStr,
          "deviceId": deviceId,
          "operatId": operatId,
        }).then(({ data }) => {
          console.log(data)
          if (data && data.code === 0) {
            // console.log(this.$message)
            that.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                that.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        });
      })

    }
    //充值
    , recharge (deviceId) {
      this.$prompt('请输入充值数量(L)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: '充值数量格式不对'
      }).then(({ value }) => {
        //确定
        if (value != null) {
          edornUrl({
            "cmd": "05",
            "deviceId": deviceId,
            "rechargeNum": value,
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          });
        }
      }).catch(() => {
        //取消
      });
    }
    , onlineFormatter (row, column) {
      let online = row.online;
      if (online === 1) {
        return "在线";
      } else {
        return "离线";
      }
    }
    , statusRead (deviceId) {
      validOnLine(deviceId).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: '设备在线',
            type: 'success',
          })
        } else {
          this.$message.error(data.msg)
        }
      });
    }
    , queryRechargeRecordListHandle (deviceId) {
      queryRechargeRecordList({
        page: 1,
        limit: 10,
        deviceId: deviceId,
      }).then(response => {
        this.devRechargeRecordList = response.data.page.list
        console.log(response)
      })
      this.rechargeRecordVisible = true
    }
    , tdsSetUp (deviceId) {
      this.$prompt('请输入TDS上限值', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: '充值数量格式不对'
      }).then(({ value }) => {
        //确定
        if (value != null) {
          edornUrl({
            "cmd": "10",
            "deviceId": deviceId,
            "topLimitTds": value,
            "lowerLimitTds": 0,
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          });
        }
      }).catch(() => {
        //取消
      });
    },
    activationDev(deviceId){
       this.$prompt('请输入激活后设备流量(L)', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: '充值数量格式不对'
      }).then(({ value }) => {
        //确定
        if (value != null ) {
          edornUrl({"cmd":"09",
          "cmdDesc":"初始化设备",
          "deviceId":deviceId,
          "dry":255,
          "lowerLimitTds":0,
          "rechargeNum":value,
          "topLimitTds":120,
          "operatId":this.$store.state.user.userInfo.userId
        }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          });
        }
      }).catch(() => {
        //取消
      });
    },
    rechargeStatusFormatter (row, column) {
      let rechargeStatus = row.rechargeStatus;
      if (rechargeStatus === 1) {
        return "充值成功";
      } else {
        return "待充值";
      }
    }
    ,getOnePageDataList () {
      this.pageIndex = 1;
      this.getDataList();
    }
  }
}
</script>
