 

import { rule } from "@/util/validateRules";
export const tableOption = {
  searchMenuSpan: 6,
  column: [
    {
      label: '名称',
      search: true,
      prop: 'publicName',
      rules: [
        { required: true, message: '请输名称', trigger: 'blur' },
        { max: 30, message: '长度在 30 个字符', trigger: 'blur' },
        { validator: rule.validatorNameCn, trigger: 'blur'}
      ]
    },
    {
      label: '键',
      prop: 'publicKey',
      rules: [
        { required: true, message: '请输入键', trigger: 'blur' },
        { validator: rule.validatorKey, trigger: 'blur'}
      ]

    },
    {
      label: '值',
      overHidden: true,
      prop: 'publicValue',
      rules: [
        { required: true, message: '请输入值', trigger: 'blur' }
      ]
    },
    {
      label: '编码',
      prop: 'validateCode'
    },
    {
      label: '类型',
      prop: 'system',
      type: 'select',
      dicUrl: '/admin/dict/type/dict_type',
      rules: [{
        required: true,
        message: '请输入类型',
        trigger: 'blur'
      }],
      search: true
    },
    {
      label: '状态',
      prop: 'status',
      width: 80,
      type: 'select',
      dicUrl: '/admin/dict/type/status_type'
    },
    {
      label: '类型',
      prop: 'publicType',
      width: 80,
      type: 'select',
      dicUrl: '/admin/dict/type/param_type',
      rules: [{
        required: true,
        message: '请选择类型',
        trigger: 'blur'
      }]
    }
    // 省略 ...
  ]
}
