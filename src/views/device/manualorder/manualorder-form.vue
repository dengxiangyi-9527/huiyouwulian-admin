<template>
  <div>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
        @keyup.enter.native="dataFormSubmit()" label-width="150px">
        <el-form-item label="价格" prop="price">
          <el-input v-model="dataForm.price" placeholder="价格" type="number"></el-input>
        </el-form-item>
        <el-form-item label="剩余数量" prop="residueNumber">
          <el-input v-model="dataForm.residueNumber" placeholder="剩余数量"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" v-if="!dataForm.id">
          <el-radio-group v-model="dataForm.type">
            <el-radio :label="1">自用</el-radio>
            <el-radio :label="2">他人使用用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型" prop="type" v-if="this.dataForm.type==1&&dataForm.id">
          <el-radio-group v-model="dataForm.type">
            <el-radio :label="1">自用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型" prop="type" v-if="this.dataForm.type==2&&dataForm.id">
          <el-radio-group v-model="dataForm.type">
            <el-radio :label="2">他人使用用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="线上运营商姓名" prop="realName" v-if="dataForm.type==1||dataForm.type==2">
          <el-input v-model="dataForm.realName" style="width:150px" placeholder="真实姓名"></el-input>
          <el-button class="btn" type="success" size="mini" @click="getMemberList">点击查询</el-button>
        </el-form-item>
        <div class="equiId" v-if="memberList.length>0">
          <span>请选择：</span>
          <span class="member_item" @click="getInfo(item,index)" v-for="(item,index) in memberList"
            :key="index">{{item.realName}}</span>
        </div>
        <el-form-item label="手机号码" prop="mobile" v-if="dataForm.type==1||dataForm.type==2">
          <el-input v-model="dataForm.mobile" placeholder="手机号码"></el-input>
        </el-form-item>

        <el-form-item label="购买者真实姓名" prop="buyerRealName" v-if="dataForm.type==2">
          <el-input v-model="dataForm.buyerRealName" style="width:150px" placeholder="购买者真实姓名">
          </el-input>
          <el-button class="btn" type="success" size="mini" @click="getMemberList1">点击查询</el-button>
        </el-form-item>
        <div class="equiId" v-if="memberList1.length>0">
          <span>请选择：</span>
          <span class="member_item" @click="getInfo1(item,index)"
            v-for="(item,index) in memberList1" :key="index">{{item.realName}}</span>
        </div>
        <el-form-item label="购买者手机" prop="buyerMobile" v-if="dataForm.type==2">
          <el-input v-model="dataForm.buyerMobile" placeholder="购买者手机"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-input v-model="dataForm.address" placeholder="收货地址" style="width:400px" readonly="">
          </el-input>
          <el-button class="btn" type="primary" size="mini" @click="getGpsList">地址定位</el-button>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressDetail">
          <el-input v-model="dataForm.addressDetail" placeholder="详细地址"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名" prop="addressName">
          <el-input v-model="dataForm.addressName" placeholder="收货人姓名"></el-input>
        </el-form-item>
        <el-form-item label="收货人手机号" prop="addressMobile">
          <el-input v-model="dataForm.addressMobile" placeholder="收货人手机号"></el-input>
        </el-form-item>

        <el-form-item label="审核" prop="status" v-if="dataForm.id&&dataForm.status==0">
          <el-radio-group v-model="dataForm.status">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核" prop="status" v-if="dataForm.id&&dataForm.status==1">
          <el-radio-group v-model="dataForm.status">
            <el-radio :label="1">通过</el-radio>
            <!-- <el-radio :label="2">拒绝</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核" prop="status" v-if="dataForm.id&&dataForm.status==2">
          <el-radio-group v-model="dataForm.status">
            <!-- <el-radio :label="1">通过</el-radio> -->
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核理由" prop="reason" v-if="dataForm.id&&dataForm.status==2">
          <el-input v-model="dataForm.reason" placeholder="拒绝理由">
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <!-- <el-button @click="cancel" v-if="dataForm.status!=0&&dataForm.id">关闭</el-button> -->
        <el-button type="primary" @click="dataFormSubmit()" v-if="!dataForm.id" v-db-click>确定
        </el-button>
        <el-button type="primary" @click="examine" v-if="dataForm.id" v-db-click>审 核 确 定
        </el-button>

      </span>
    </el-dialog>
    <el-dialog title="地图定位" :visible.sync="mapequipmentDialog" width="930px">
      <!-- <div id="container"></div> -->
      <iframe id="container" width="100%" height="100%" frameborder=0
        src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&policy=1&key=FGDBZ-HPPHR-37OW6-WRP63-IXKUS-MZBLK&referer=myapp">
      </iframe>

      <el-input v-model="dataForm.address" class="ipt"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mapequipmentDialog = false">取 消</el-button>
        <el-button type="primary" @click="getClick" v-db-click>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped>
#container {
  /*地图(容器)显示大小*/
  width: 80%;
  height: 600px;
}
.btn {
  margin-left: 20px;
}
.equiId {
  margin: 20px 20px;
}
.equiId_item {
  display: inline-table;
  /* width: 130px; */
  /* height: 30px; */
  padding: 5px 10px;
  margin: 5px 5px;
  border: 1px solid rgba(0, 140, 255, 0.582);
  border-radius: 5px;
}
.ipt {
  margin-top: 20px;
}
.member_item {
  /* display: inline-table; */
  /* padding: 5px 10px;
  margin: 35px 5px; */
  margin: 10px 10px;
  width: 120px;
  height: 50px;
  border: 1px solid rgba(0, 140, 255, 0.582);
  border-radius: 5px;
}
</style>
 
<script>
import { getObj, addObj, putObj, memberList, examine } from '@/api/device/manualorder'

export default {
  data () {
    return {
      map: null,

      city: '',
      // mapequipmentDialog: false,
      addressKeyword: '', // 搜索地址关键词
      visible: false,

      memberList: [
      ],
      memberList1: [],
      // 地图弹框
      mapequipmentDialog: false,
      dataForm: {
        // id: 0,
        address: '',
        longitude: 0, // 经度
        latitude: 0, // 纬度
        addressDetail: '',
        addressMobile: '',
        addressName: '',
        price: '',
        residueNumber: '',
        memberId: '',
        realName: '',
        mobile: '',
        // addUser: '',
        userId: '',
        status: '0',
        reason: '',
        type: '',
        buyerId: '',
        buyerMobile: '',
        buyerRealName: ''
      },
      dataRule: {
        price: [
          { required: true, message: '价格不能为空', trigger: 'blur' }
        ],
        residueNumber: [
          { required: true, message: '剩余数量不能为空', trigger: 'blur' }
        ],
        addressDetail: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        addressName: [
          { required: true, message: '收货人不能为空', trigger: 'blur' }
        ],
        addressMobile: [
          { required: true, message: '收货人电话不能为空', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        addUser: [
          { required: true, message: '添加人ID不能为空', trigger: 'blur' }
        ],
        addUserName: [
          { required: true, message: '添加人用户明不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '0,待审核,1,审核通过,2审核不通过不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '审核时间不能为空', trigger: 'blur' }
        ],
        updateUser: [
          { required: true, message: '审核人不能为空', trigger: 'blur' }
        ],
        updateUserName: [
          { required: true, message: '审核人姓名不能为空', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '拒绝理由不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型.1 自用.2,他人使用不能为空', trigger: 'blur' }
        ],
        buyerId: [
          { required: true, message: '购买人不能为空', trigger: 'blur' }
        ],
        buyerMobile: [
          { required: true, message: '购买者手机不能为空', trigger: 'blur' }
        ],
        buyerRealName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {


  },
  mounted () {
    window.addEventListener('message', (event) => {
      console.log(event)
      this.dataForm.address = event.data.poiaddress
      this.dataForm.latitude = event.data.latlng.lat
      this.dataForm.longitude = event.data.latlng.lng
      // this.mapequipmentDialog = false
      console.log(this.dataForm)
      console.log('location', event.data);
      loc = event.data; // 接收位置信息
      if (loc && loc.module === 'locationPicker') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
        var markUrl = 'https://apis.map.qq.com/tools/poimarker' +
          '?marker=coord:' + loc.lat + ',' + loc.lng +
          ';title:我的位置;addr:' + (loc.addr || loc.city) +
          '&key=FGDBZ-HPPHR-37OW6-WRP63-IXKUS-MZBLK&referer=myapp';
        //给位置展示组件赋值
        document.getElementById('container').src = markUrl;
        //  流程：1.将loc信息保存起来，2.隐藏当前弹框。3.将loc信息回填到上一页面
      } else { //定位组件在定位失败后，也会触发message, event.data为null
        this.$message({
          type: 'warning',
          message: '定位失败，稍后重试！'
        })
      }
    }, false);
  },
  beforeDestroy () {
    removeEventListener()
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          getObj(this.dataForm.id).then(response => {
            console.log(response)
            this.dataForm = response.data.data
          })
        } else {
          this.dataForm = {}
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      console.log(this.dataForm)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            putObj(this.dataForm).then(data => {
              // this.$message.success('修改成功')
              this.visible = false
              this.$emit('refreshDataList')
            });
          } else {
            addObj(this.dataForm).then(data => {
              console.log(data)
              if (data.data.code == 0) {
                this.$message.success('添加成功')
                this.visible = false
                this.$emit('refreshDataList')
              } else {
                this.$message.warning(data.data.msg)
              }
            })
          }
        }
      })
    },
    //审核examine
    examine () {
      // console.log(this.dataForm)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            examine(this.dataForm).then(data => {
              if (data.data.code == 0) {
                console.log('审核')
                this.$message.success('审核成功')
                this.visible = false
                this.$emit('refreshDataList')
              } else {
                this.$message.warning(data.data.msg)
              }

            });
          } else {
            addObj(this.dataForm).then(data => {
              this.$message.success('添加成功')
              this.visible = false
              this.$emit('refreshDataList')
            })
          }
        }
      })
    },
    cancel () {
      this.visible = false
      this.memberList = []
    },
    //姓名
    getMemberList () {
      console.log(this.dataForm.realName)
      if (this.dataForm.realName == '') {
        this.$notify({
          type: 'warning',
          title: '警告',
          message: '请输入用户姓名或电话'
        })
      } else {
        console.log('111')
        memberList({
          param: this.dataForm.realName
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.memberList = res.data.data
            if (res.data.data.length <= 0) {
              this.$message({
                message: '没有查询到该用户',
                type: 'warning'
              })
              this.buyName = ''
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
      }
    },
    getInfo (item, index) {
      console.log(item, index)
      this.dataForm.memberId = item.userId
      this.dataForm.mobile = item.mobile
      this.memberList = []
    },
    closeDialog () {
      this.$nextTick(() => {
        this.$refs['addOrUpdate'].clearValidate()
      })
    },
    getMemberList1 () {
      console.log(this.dataForm.buyerRealName)
      if (this.dataForm.buyerRealName == '') {
        this.$notify({
          type: 'warning',
          title: '警告',
          message: '请输入用户姓名或电话'
        })
      } else {
        memberList({
          param: this.dataForm.buyerRealName
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.memberList1 = res.data.data
            if (res.data.data.length <= 0) {
              this.$message({
                message: '没有查询到该用户',
                type: 'warning'
              })

            }
            // this.dataForm.buyerRealName = ''
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
      }
    },
    getInfo1 (item, index) {
      console.log(item, index)
      this.dataForm.buyerId = item.userId
      this.dataForm.buyerMobile = item.mobile
      this.memberList1 = []
    },
    getGpsList () {
      console.log('111')
      var that = this
      this.mapequipmentDialog = true
      // TMap.init({ id: 'container' })
    },

    getClick () {

      //为防止定位组件在message事件监听前已经触发定位成功事件，在此处显示请求一次位置信息
      // document.getElementById("geoPage").contentWindow.postMessage('getLocation', '*');
      //设置6s超时，防止定位组件长时间获取位置信息未响应
      // setTimeout(function () {
      //   if (!loc) {
      //     //主动与前端定位组件通信（可选），获取粗糙的IP定位结果
      //     document.getElementById("geoPage")
      //       .contentWindow.postMessage('getLocation.robust', '*');
      //   }
      // }, 6000);
      this.mapequipmentDialog = false
      console.log(this.dataForm)
    },
  }
}
</script>
