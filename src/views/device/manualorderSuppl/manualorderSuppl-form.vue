<template>
  <div>
    <el-dialog :title="!dataForm.id ? '新增' : '查看'" :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
        @keyup.enter.native="dataFormSubmit()" label-width="150px">
        <el-form-item label="会员姓名" prop="realName">
          <el-input v-model="dataForm.realName" style="width:150px" placeholder="真实姓名"></el-input>
          <el-button class="btn" type="success" size="mini" @click="getMemberInfo"
            v-if="!dataForm.id">点击查询</el-button>
        </el-form-item>
        <div class="equiId" v-if="memberList1.length>0&&!dataForm.id">
          <span>请选择：</span>
          <span class="member_item" @click="getMember(item,index)"
            v-for="(item,index) in memberList1" :key="index">{{item.realName}}</span>
        </div>
        <el-table :data="addGoodsList" style="width: 80%;" class="goodstist"
          :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
          v-if="addGoodsList.length>=1">
          <el-table-column property="name" width="150" label="名称" />
          <el-table-column property="picUrl" width="250" label="图片">
            <template slot-scope="scope">
              <img v-if="scope.row.picUrl" :src="scope.row.picUrl" width="50">
            </template>
          </el-table-column>
          <!-- <el-table-column property="specifications" width="100" label="规格" /> -->
          <el-table-column property="retailPrice" width="150" label="价格" />
          <!-- <el-table-column property="calnumber" width="100" label="计算值" /> -->
          <!-- <el-table-column property="totalNumber" width="150" label="总数"> -->
          <!-- </el-table-column> -->
          <el-table-column align="center" label="操作" width="150"
            class-name="small-padding fixed-width" v-if="!dataForm.id">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleSpecificationDelete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item label="价格" prop="price">
          <el-input v-model="dataForm.price" placeholder="价格" type="number"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品名称" v-if="dataForm.id" prop="goodsName">
          <el-input v-model="dataForm.goodsName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" v-if="dataForm.id" prop="url">
          <template slot-scope="scope">
            <img v-if="scope.row.url" :src="scope.row.url" width="40">
          </template>
        </el-form-item> -->
        <el-form-item label="剩余数量" prop="residueNumber">
          <el-input v-model="dataForm.residueNumber" placeholder="剩余数量"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-input v-model="dataForm.address" placeholder="收货地址" style="width:400px" readonly>
          </el-input>
          <el-button class="btn" type="primary" size="mini" @click="getGpsList" v-if="!dataForm.id">
            地址定位</el-button>
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
        <el-button type="primary" @click="examine" v-if="dataForm.id" v-db-click>审
          核 确 定
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

    <!-- 商品弹窗 -->
    <el-dialog :visible.sync="comboDialogVisible" title="商品选择">
      <!-- <div class="filter-container">
        <el-form :data="nameInfo">
          <el-input class="filter-item" style="width: 200px;" v-model="nameInfo.info"
            @blur="changeName(nameInfo.info)" @keyup.enter.native="searchSingleGoods"
            placeholder="请输入商品名称" />
          <el-button class="filter-item1" type="primary" icon="el-icon-search"
            @click="searchSingleGoods">查找
          </el-button>
        </el-form>
      </div> -->
      <div class="avue-crud">
        <el-table border style="width: 100%;" :data="searchGoodsList">
          <el-table-column prop="name" header-align="center" align="center" label="名称">
          </el-table-column>
          <el-table-column prop="picUrl" header-align="center" align="center" label="图片">
            <template slot-scope="scope">
              <img v-if="scope.row.picUrl" :src="scope.row.picUrl" width="40">
            </template>
          </el-table-column>

          <el-table-column prop="retailPrice" header-align="center" align="center" label="价格">
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
.equiId {
  margin-left: 50px;
  /* margin: 0 auto; */
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
.el-table {
  margin: 20px auto !important;
  border: none !important;
}
</style>
 
<script>
import { getObj, addObj, putObj, memberList, examine1, goodsList } from '@/api/device/manualorder'
// import { listGoods } from '@/api/mall/goods'
export default {
  data () {
    return {
      map: null,
      comboDialogVisible: false,
      pageSize: 10,
      pageIndex: 1,
      city: '',
      userId: 0,
      page: 1,
      totalPage: 0,
      totalCount: 0,
      limit: 10,
      addGoodsList: [],
      searchGoodsList: [],
      // mapequipmentDialog: false,
      addressKeyword: '', // 搜索地址关键词
      visible: false,
      listLoading: true,

      memberList: [
      ],
      memberList1: [],
      // 地图弹框
      mapequipmentDialog: false,
      dataForm: {
        // id: 0,
        address: '',
        goodsId: 0,
        longitude: 0, // 经度
        latitude: 0, // 纬度
        addressDetail: '',
        addressMobile: '',
        addressName: '',
        limit: 10,
        price: '',
        residueNumber: '',
        memberList1: [],
        memberId: '',
        realName: '',
        // realName1: '',
        mobile: '',
        // addUser: '',
        userId: '',
        status: '0',
        reason: '',
        type: 3,
        buyerId: '',
        buyerMobile: '',
        buyerRealName: '',
        goodsName: '',
        url: ''
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
            this.dataForm = response.data.data
            if (this.addGoodsList.length <= 0) {
              let list = this.addGoodsList.push({ 'picUrl': response.data.data.url, 'name': response.data.data.goodsName, 'retailPrice': response.data.data.price })
            }
          })
        } else {
          this.addGoodsList = []
          this.memberList1 = []
        }
      })
    },
    handleSpecificationDelete (row) {
      const index = this.addGoodsList.indexOf(row)
      this.addGoodsList.splice(index, 1)
      // this.specToProduct()
    },
    sizeChangeHandle (val) {
      this.limit = val
      this.page = 1
      // this.getMember()
      goodsList({
        userId: this.userId,
        limit: this.limit,
        page: this.page
      }).then(res => {
        if (res.data.code == 0) {
          this.comboDialogVisible = true
          this.totalPage = res.data.page.totalPage
          this.totalCount = res.data.page.totalCount
          this.searchGoodsList = res.data.page.list
        } else {
          // this.$notify
        }

      })
    },
    // searchSingleGoods () {
    //   this.getMember()
    //   // this.isShow = true
    // },
    currentChangeHandle (val) {
      this.page = val
      // this.getMember()
      goodsList({
        userId: this.userId,
        limit: this.limit,
        page: this.page
      }).then(res => {
        if (res.data.code == 0) {
          this.comboDialogVisible = true
          this.totalPage = res.data.page.totalPage
          this.totalCount = res.data.page.totalCount
          this.searchGoodsList = res.data.page.list
        } else {
          // this.$notify
        }

      })
    },
    // 表单提交
    dataFormSubmit () {
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
    //添加
    addGoods (row) {
      if (this.addGoodsList.length > 0) {
        this.$message.error('只能添加一个')
      } else {
        this.dataForm.goodsId = row.id
        this.addGoodsList.push({ ...row })
        this.comboDialogVisible = false
        this.$notify({
          type: 'success',
          title: '成功',
          message: '添加成功'
        })
      }

    },
    //审核examine
    examine () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.id) {
            examine1(this.dataForm).then(data => {
              if (data.data.code == 0) {
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
    // getMemberList () {
    //   console.log(this.dataForm.realName)
    //   if (this.dataForm.realName == '') {
    //     this.$notify({
    //       type: 'warning',
    //       title: '警告',
    //       message: '请输入用户姓名或电话'
    //     })
    //   } else {
    //     console.log('111')
    //     memberList({
    //       param: this.dataForm.realName
    //     }).then(res => {
    //       console.log(res)
    //       if (res.data.code == 0) {
    //         this.memberList = res.data.data
    //         if (res.data.data.length <= 0) {
    //           this.$message({
    //             message: '没有查询到该用户',
    //             type: 'warning'
    //           })
    //           this.buyName = ''
    //         }
    //       } else {
    //         this.$message({
    //           message: res.data.msg,
    //           type: 'warning'
    //         })
    //       }
    //     })
    //   }
    // },
    // getInfo (item, index) {
    //   console.log(item, index)
    //   this.dataForm.memberId = item.userId
    //   this.dataForm.mobile = item.mobile
    //   this.memberList = []
    // },
    //会员查询
    getMember (item) {
      // console.log()
      this.userId = item.userId
      this.dataForm.memberId = item.userId
      goodsList({
        userId: this.userId,
        limit: this.limit,
        page: this.page
      }).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          this.comboDialogVisible = true
          this.totalPage = res.data.page.totalPage
          this.totalCount = res.data.page.totalCount
          this.searchGoodsList = res.data.page.list
        } else {
          // this.$notify
        }

      })

    },
    closeDialog () {
      this.$nextTick(() => {
        this.$refs['addOrUpdate'].clearValidate()
      })
    },
    // getMemberList1 () {
    //   console.log(this.dataForm.buyerRealName)
    //   if (this.dataForm.buyerRealName == '') {
    //     this.$notify({
    //       type: 'warning',
    //       title: '警告',
    //       message: '请输入用户姓名或电话'
    //     })
    //   } else {
    //     memberList({
    //       param: this.dataForm.buyerRealName
    //     }).then(res => {
    //       console.log(res)
    //       if (res.data.code == 0) {
    //         this.memberList1 = res.data.data
    //         if (res.data.data.length <= 0) {
    //           this.$message({
    //             message: '没有查询到该用户',
    //             type: 'warning'
    //           })

    //         }
    //         // this.dataForm.buyerRealName = ''
    //       } else {
    //         this.$message({
    //           message: res.data.msg,
    //           type: 'warning'
    //         })
    //       }
    //     })
    //   }
    // },
    //会员查询
    getMemberInfo () {
      // this.comboDialogVisible = true
      // console.log(thiscomboDialogVisible)
      if (this.dataForm.realName == '') {
        this.$notify({
          type: 'warning',
          title: '警告',
          message: '请输入用户姓名或电话'
        })
      } else {
        memberList({
          param: this.dataForm.realName
        }).then(res => {
          if (res.data.code == 0) {
            this.memberList1 = res.data.data
            if (res.data.data.length <= 0) {
              this.$message({
                message: '没有查询到该用户',
                type: 'warning'
              })
              // this.re = ''
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
    // getInfo1 (item, index) {
    //   console.log(item, index)
    //   this.dataForm.buyerId = item.userId
    //   this.dataForm.buyerMobile = item.mobile
    //   this.memberList1 = []
    // },
    getGpsList () {
      console.log(111)
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
    },
  }
}
</script>
