<template>
  <div class="mod-config">
    <basic-container>
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
<!--          <el-button v-if="permissions.goodsGive_mallgoodsgive_add" icon="el-icon-plus" type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
              <el-button icon="el-icon-plus" type="primary" @click="handleCreate()" @refreshDataList="getDataList">新增</el-button>
        </el-form-item>
      </el-form>

      <div class="avue-crud">
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading">
            <el-table-column
              prop="goodsName"
              header-align="center"
              align="center"
              label="体验商品名称">
            </el-table-column>
            <el-table-column
              prop="goodsPicUrl"
              header-align="center"
              align="center"
              label="体验商品图片">
              <template slot-scope="scope">
                <img :src="scope.row.goodsPicUrl" alt="体验商品" style="width:60px; height:60px;">
              </template>
            </el-table-column>
            <el-table-column
              prop="giveGoodsName"
              header-align="center"
              align="center"
              label="赠送商品名称">
            </el-table-column>
          <el-table-column
            prop="giveGoodsNumber"
            header-align="center"
            align="center"
            label="赠送商品数量">
          </el-table-column>
            <el-table-column
              prop="giveGoodsPicUrl"
              header-align="center"
              align="center"
              label="赠送货品图片">
              <template slot-scope="scope">
                <img :src="scope.row.giveGoodsPicUrl" alt="赠送商品" style="width:60px; height:60px;">
              </template>
            </el-table-column>
                      <el-table-column
                    prop="createTm"
                    header-align="center"
                    align="center"
                    label="添加时间">
            </el-table-column>
                      <el-table-column
                    prop="validEndTime"
                    header-align="center"
                    align="center"
                    label="有效截止时间">
            </el-table-column>
                    <el-table-column
                  header-align="center"
                  align="center"
                  label="操作"
                    fixed="right"
                    width="180">
            <template slot-scope="scope">
<!--              <el-button v-if="permissions.goodsGive_mallgoodsgive_edit" type="text" size="small" icon="el-icon-edit" @click="addOrUpdateHandle(scope.row.goodsGiveId)">修改</el-button>-->
<!--              <el-button v-if="permissions.goodsGive_mallgoodsgive_del" type="text" size="small" icon="el-icon-delete" @click="deleteHandle(scope.row.goodsGiveId)">删除</el-button>-->
              <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(scope.row)" @refreshDataList="getDataList">修改</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteHandle(scope.row.goodsGiveId)">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="avue-crud__pagination">
        <el-pagination
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :total="totalPage"
                background
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!-- 弹窗, 新增 / 修改 -->
      <table-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></table-form>
    </basic-container>
  </div>
</template>

<script>
  import {fetchList, delObj} from '@/api/mall/mallgoodsgive'
  import TableForm from './goodsGive-form'
  import {mapGetters} from 'vuex'
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
          size: this.pageSize
        })).then(response => {
          this.dataList = response.data.page.list
          this.totalPage = response.data.page.totalPage
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
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          var paramIds =[];
          paramIds.push(id);
          return delObj(paramIds)
        }).then(data => {
          this.$message.success('删除成功')
          this.getDataList()
        })
      },
      handleCreate () {
        this.$router.push({ path: '/goodsgive/create'});
      },
      handleUpdate (row) {
        console.log(row)
        this.$router.push({ path: '/goodsgive/edit', query: { id: row.goodsGiveId } });
      },
    }
  }
</script>
