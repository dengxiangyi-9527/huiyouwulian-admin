 
import iconList from '@/const/iconList'

export const tableOption = {
  tip: false,
  lazy:true,
  dialogWidth: "60%",
  tree: true,
  border: true,
  index: true,
  viewBtn: true,
  align: 'center',
  column: [
    {
      label: "名称",
      prop: "name",
      width: 180,
      rules: [
        {
          required: true,
          message: "请输入名称",
          trigger: "blur"
        }
      ]
    },
    {
      label: "类型",
      prop: "type",
      type: "radio",
      slot: true,
      border:true,
      valueFormat: "string",
      dicData: [
        {
          label: "左菜单",
          value: "0"
        },
        {
          label: "顶菜单",
          value: "2"
        },
        {
          label: "按钮",
          value: "1"
        },
      ],
      rules: [
        {
          required: true,
          message: "请选择菜单类型",
          trigger: "blur"
        }
      ]
    },
    {
      label: "路由路径",
      prop: "path",
      width: 180,
      addDisplay: true,
      editDisplay: true,
      overHidden: true,
      rules: [
        {
          required: true,
          message: "请输入路由地址",
          trigger: "blur"
        }
      ]
    },
    {
      label: "上级菜单",
      prop: "parentId",
      type: "tree",
      dicUrl: "/admin/menu/tree",
      addDisplay: true,
      editDisplay: true,
      hide: true,
      props: {
        label: "name",
        value: "id"
      },
      rules: [
        {
          required: true,
          message: "请选择上级菜单",
          trigger: "click",
        }
      ]
    },
    {
      label: "图标",
      prop: "icon",
      type: "icon-select",
      slot: true,
      addDisplay: true,
      editDisplay: true,
      iconList: iconList,
      rules: [
        {
          required: true,
          message: "请输入图标",
          trigger: "click"
        }
      ]
    },
    {
      label: "权限标识",
      prop: "code",
      addDisplay: true,
      editDisplay: true,
      rules: [
        {
          required: true,
          message: "权限标识",
          trigger: "blur"
        }
      ]
    },
    {
      label: "排序",
      prop: "sort",
      type: "number",
      rules: [
        {
          required: true,
          message: "请输入菜单排序",
          trigger: "blur"
        }
      ]
    }
  ]
}
