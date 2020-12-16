<template>
  <div class="address">
    <div class="search">
      <el-input
        placeholder="输入省市/区县进行过滤"
        v-model="filterText">
      </el-input>
      <el-button @click="getFilterList()" type="primary" icon="el-icon-search">查询</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="clear()">清空</el-button>
    </div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <el-select filterable v-model="provinceId" @change="getCityList(provinceId)" placeholder="请选择省份">
          <el-option
            v-for="(item,index) in provinceList"
            :key="item.id"
            :label="item.fullName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select filterable v-model="cityId" @change="getAreaList(cityId)" placeholder="请选择城市">
          <el-option
            v-for="(item,index) in cityList"
            :key="item.id"
            :label="item.fullName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select filterable v-model="areaId" @change="getStreetList(areaId)" placeholder="请选择区/县">
          <el-option
            v-for="(item,index) in areaList"
            :key="item.id"
            :label="item.fullName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="list">
      <div class="item" v-for="(item,index) in dataList" :key="item.id">{{item.fullName}}</div class="item">
    </div>
  </div>
</template>

<script>
import { addressList } from '@/api/admin/address'
export default {
  data () {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      streetList: [],
      provinceId: '',
      cityId: '',
      areaId: '',
      filterText: '',
      dataList: []
    }
  },
  mounted() {
    this.getProvinceList()
  },
  methods: {
    clear() {
      this.filterText = ''
    },
    // 获取省市数据列表
    getProvinceList(name,parent_id) {
      addressList(Object.assign({
          name: '',
          parent_id: 0
        })).then(res => {
        this.provinceList = res.data.data
        this.dataList = this.provinceList
      })
    },
    // 获取城市数据列表
    getCityList(provinceId) {
      addressList(Object.assign({
        name: '',
        parent_id: provinceId
      })).then(res => {
        this.cityList = res.data.data
        this.dataList = this.cityList
      })
    },
    // 获取区县数据列表
    getAreaList(cityId) {
      addressList(Object.assign({
        name: '',
        parent_id: cityId
      })).then(res => {
        this.areaList = res.data.data
        this.dataList = this.areaList
      })
    },
    // 获取街道数据列表
    getStreetList(areaId) {
      addressList(Object.assign({
        name: '',
        parent_id: areaId
      })).then(res => {
        this.streetList = res.data.data
        this.dataList = this.streetList
      })
    },
    getFilterList() {
      addressList(Object.assign({
        name: this.filterText,
        parent_id: ''
      })).then(res => {
        if(res.data.data[0] != undefined) {
          const { fullName, id } = res.data.data[0]
          this.getCityList(id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search{
    .el-input{
      width: 25%;
      margin: 10px;
      .el-input__inner{
        margin: 10px;
        width: 100%;
      }
    }
  }
  .list{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid #DCDFE6;
    background-color: #f9fafc;
    margin: 0 20px;
    padding-left: 30px;
    .item{
      width: 400px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #DCDFE6;
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding-top: 10px;
    background-color: #f9fafc;
  }
  .title{
    text-align: center;
  }
  .text{
    text-align: center;
    margin-bottom: 16px;
  }
</style>
