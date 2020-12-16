 

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  align: 'center',
  column: [
    {
      label: '租户id',
      prop: 'id',
      hide: true,
      editDisabled: true,
      editDisplay: false,
      addDisplay: false
    },
    {
      label: '租户名称',
      prop: 'name',
      search: true,
      rules: [
        { required: true, message: '请输入租户名称', trigger: 'blur'},
        { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
      ]
    },
    {
      label: '租户编号',
      type: 'number',
      prop: 'code',
      rules: [{
        required: true,
        message: '请输入租户编号',
        trigger: 'blur'
      }]
    },
    {
      label: '开始时间',
      prop: 'startTime',
      type: 'datetime',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入结束时间',
        trigger: 'blur'
      }]
    },
    {
      label: '结束时间',
      prop: 'endTime',
      type: 'datetime',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入结束时间',
        trigger: 'blur'
      }]
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      border:true,
      dicUrl: '/admin/dict/type/status_type',
      search: true
    },
    {
      label: '区域',
      prop: 'area',
      formslot: true,
      slot: true,
      overHidden: true,
      span: 24,
      rules: [{
        required: true,
        message: '请选择区域',
        trigger: 'blur'
      }]
    }
    
  ]
}
