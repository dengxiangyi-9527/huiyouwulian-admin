<template>
  <el-dialog :title="!dataForm.payProfitsConfigId ? '新增' : '修改'" :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm"
      @keyup.enter.native="dataFormSubmit()" label-width="150px">
      <el-form-item label="分润类型" @click="init(id)" prop="payProfitsTypeCd">
        <el-select v-model="dataForm.fenRunList" placeholder="请选择配置分润类型" @change="e(dataForm.fenRunList)">
          <el-option v-for="item in fenRunConfList" :key="item.value" :label="item.label"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="payProfitsTypeName">
        <el-input v-model="dataForm.payProfitsTypeName" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="配置类型" prop="configType">
        <el-select v-model="dataForm.configType" placeholder="请选择配置类型" disabled>
          <el-option v-for="item in configTypeSelectList" :key="item.type" :label="item.title"
                     :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方式" prop="payProfitsWay">
        <el-select v-model="dataForm.payProfitsWay" placeholder="请选择方式" disabled>
          <el-option v-for="item in payProfitsWaySelectList" :key="item.type" :label="item.title"
            :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台补助比列(%)" prop="platformProfitsRatio">
        <el-input v-model="dataForm.platformProfitsRatio" placeholder="平台补助比列%"></el-input>
      </el-form-item>
      <el-form-item label="平台补助金额(%)" prop="platformProfitsRatio" v-if="this.dataForm.payProfitsWay == 2">
        <el-input v-model="dataForm.platformProfitsRatio" placeholder="平台补助比列%"></el-input>
      </el-form-item>
      <el-form-item label="固定比例(%)" prop="fixedProfitsRatio">
        <el-input v-model="dataForm.fixedProfitsRatio" placeholder="固定比例%"></el-input>
      </el-form-item>
      <el-form-item label="固定金额(%)" prop="fixedProfitsRatio" v-if="this.dataForm.payProfitsWay == 2">
        <el-input v-model="dataForm.fixedProfitsRatio" placeholder="固定比例%"></el-input>
      </el-form-item>
      <el-form-item label="累加初始数量" prop="payProfitsAddMinNum" v-if="this.dataForm.payProfitsWay == 3">
        <el-input v-model="dataForm.payProfitsAddMinNum" placeholder="累增计算的开始数量"></el-input>
      </el-form-item>
      <el-form-item label="累加数量" prop="payProfitsAddBaseNum" v-if="this.dataForm.payProfitsWay == 3">
        <el-input v-model="dataForm.payProfitsAddBaseNum" placeholder="分润条件累加数量"></el-input>
      </el-form-item>
      <el-form-item label="累加比例" prop="payProfitsAddBaseRatio" v-if="this.dataForm.payProfitsWay == 3">
        <el-input v-model="dataForm.payProfitsAddBaseRatio" placeholder="分润条件累加比例"></el-input>
      </el-form-item>
      <el-form-item label="最大数量" prop="payProfitsAddMaxNum" v-if="this.dataForm.payProfitsWay == 3">
        <el-input v-model="dataForm.payProfitsAddMaxNum" placeholder="累增计算的最大数量"></el-input>
      </el-form-item>
      <el-form-item label="规则说明" prop="payProfitsDesc">
        <el-input v-model="dataForm.payProfitsDesc" placeholder="规则说明"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-db-click>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getObj, addObj, putObj, fenRunConfList } from '@/api/profits/payprofitsconfig'

export default {
  data () {
    var checkFloat = (vule) => {
      var numReg = /^[+-]?((0|([1-9]\d*))\.\d+)?$/;
      var numRe = new RegExp(numReg);
      if (vule == '') {
        return true;
      }
      if (!numRe.test(vule)) {
        return false;
      }
      return true;
    }
    var checkInt = (vule) => {
      var numReg = /^[0-9]+$/;
      var numRe = new RegExp(numReg);
      if (vule == '') {
        return true;
      }
      if (!numRe.test(vule)) {
        return false;
      }
      return true;
    }
    var isAddRatioWay_addNUm = (rule, value, callback) => {
      if (!value && value!== 0) {
        if (this.dataForm.payProfitsWay == 3) {
          return callback(new Error('累加数量不能为空'));
        }
      }
      if (!checkInt(value)) {
        return callback(new Error('累加数量 请填写数字类型'));
      }
      if (value < 0) {
        return callback(new Error('累加数量不能小于0'));
      }
      return callback();
    }
    var isAddRatioWay_addRatio = (rule, value, callback) => {
      if (!value) {
        if (this.dataForm.payProfitsWay == 3) {
          return callback(new Error('累加比例不能为空'));
        }
      }
      if (!checkInt(value) && !checkFloat(value)) {
        return callback(new Error('累加数量 请填写数字或者小数类型'));
      }
      if (value < 0) {
        return callback(new Error('累加比例不能小于0'));
      }
      if (value > 100) {
        return callback(new Error('累加比例不能大于100'));
      }
      return callback();
    }
    var isAddRatioWay_maxNum = (rule, value, callback) => {
      if (!value && value!== 0) {
        if (this.dataForm.payProfitsWay == 3) {
          return callback(new Error('最大数量不能为空'));
        }
      }
      if (!checkInt(value)) {
        return callback(new Error('最大数量 请填写数字类型'));
      }
      if (value < this.dataForm.payProfitsAddMinNum) {
        return callback(new Error('最大数量不能小于 累增初始数量'));
      }
      return callback();
    }
    var isAddRatioWay_minNum = (rule, value, callback) => {
      if (!value && value!== 0) {
        if (this.dataForm.payProfitsWay == 3) {
          return callback(new Error('累增初始数量不能为空'));
        }
      }
      if (!checkInt(value)) {
        return callback(new Error('累增初始数量 请填写数字类型'));
      }
      if (value < 0) {
        return callback(new Error('累增初始数量不能小于0'));
      }
      return callback();
    }
    var isPlatformRatioWay_platformRatio = (rule, value, callback) => {
      if(!value && value!== 0) {
        return callback(new Error('平台补助比列不能为空'))
      }
      if (value < 0) {
        return callback(new Error('平台补助比列不能小于0'));
      }
      return callback();
    }
    var isFixedRatioWay_fixedRatio = (rule, value, callback) => {
      if(!value && value!== 0) {
        return callback(new Error('固定比例不能为空'))
      }
      if (value < 0) {
        return callback(new Error('固定比例不能小于0'));
      }
      if(value > 100 - this.dataForm.platformProfitsRatio) {
        return callback(new Error('平台补助比例和固定比例之和不能大于100'))
      }
      return callback();
    }
    return {
      visible: false,
      dataForm: {
        payProfitsConfigId: 0,
        payProfitsTypeCd: '',
        payProfitsTypeName: '',
        configType: 1,
        platformProfitsRatio: '',
        fixedProfitsRatio: '',
        payProfitsWay: '',
        payProfitsAddBaseNum: '',
        configValidFlg: '',
        payProfitsAddBaseRatio: '',
        payProfitsAddMaxNum: '',
        payProfitsAddMinNum: '',
        payProfitsDesc: '',
        fenRunList: {},
      },
      fenRunConfList: [],
      dataRule: {
        payProfitsTypeCd: [
          { required: true, message: '分润类型不能为空', trigger: 'blur' }
        ],
        payProfitsTypeName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        configType: [
          { required: true, message: '配置类型不能为空', trigger: 'blur' }
        ],
        platformProfitsRatio: [
          { required: true, message: '平台补助比列不能为空', trigger: 'blur' }
           , { validator: isPlatformRatioWay_platformRatio, trigger: 'blur' }
        ],
        fixedProfitsRatio: [
          { required: true, message: '固定比例不能为空', trigger: 'blur' }
           , { validator: isFixedRatioWay_fixedRatio, trigger: 'blur' }
        ],
        payProfitsWay: [
          { required: true, message: '方式不能为空', trigger: 'blur' }
        ],
        payProfitsAddBaseNum: [
          { required: false, message: '累加数量不能为空', trigger: 'blur' }
          , { validator: isAddRatioWay_addNUm, trigger: 'blur' }
        ],
        configValidFlg: [
          { required: false, message: '状态不能为空', trigger: 'blur' }
        ],
        payProfitsAddBaseRatio: [
          { required: false, message: '累加比例不能为空', trigger: 'blur' }
          , { validator: isAddRatioWay_addRatio, trigger: 'blur' }
        ],
        payProfitsAddMaxNum: [
          { required: false, message: '最大数量不能为空', trigger: 'blur' }
          , { validator: isAddRatioWay_maxNum, trigger: 'blur' }
        ],
        payProfitsAddMinNum: [
          { required: false, message: '累增初始数量不能为空', trigger: 'blur' }
          , { validator: isAddRatioWay_minNum, trigger: 'blur' }
        ],
        payProfitsDesc: [
          { required: false, message: '规则说明不能为空', trigger: 'blur' }
        ]
      }
      , payProfitsWaySelectList: [{ 'title': '固定比例(%)', 'type': 1 }, { 'title': '固定金额(￥)', 'type': 2 }, { 'title': '累加比例(%)', 'type': 3 }]
      , configTypeSelectList: [{ 'title': '分润项', 'type': 1 }, { 'title': '扣除项', 'type': 2 }],
    }
  },
  created() {
    this.fenRunConfList1();
  },
  methods: {
    e(data) {
      console.log(data)
      this.dataForm.payProfitsTypeName = data.label
      this.dataForm.payProfitsWay = data.way
      this.dataForm.configType = 1
      this.dataForm.payProfitsTypeCd = data.value
    },
    init (id) {
      this.dataForm.payProfitsConfigId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.payProfitsConfigId) {
          getObj(this.dataForm.payProfitsConfigId).then(response => {
            this.dataForm = response.data.data
            this.fenRunConfList.filter( item => {
              if( this.dataForm.payProfitsTypeCd != item.value) {
                return item
              }
              this.dataForm.fenRunList = item
            })
          })
          } else {
          this.dataForm.fenRunList = {}
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.payProfitsConfigId) {
            putObj(this.dataForm).then(data => {
              this.$message.success('修改成功')
              this.visible = false
              this.$emit('refreshDataList')
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
    }
    , fenRunConfList1(){
      fenRunConfList().then( res => {
        this.fenRunConfList = res.data.data
      })
    }
  }
}
</script>

