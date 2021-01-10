<template>
  <el-form
      inline
      :label-position="'left'">
    <el-form-item label="院线">
      <el-select
          style="width: 200px;"
          v-model="search.exhibitorUUIDS"
          placeholder="请选择"
          :remote-method="queryExhibitor()"
          :loading="search.loading"
          @visible-change="queryExhibitor()"
          clearable
          filterable
          remote
          multiple>
        <el-option
            v-for="item in search.exhibitorList"
            :key="item.value"
            :label="item.key"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="影院">
      <el-select
          style="width: 200px;"
          v-model="search.complexIDS"
          placeholder="请选择"
          :remote-method="queryComplex(search.exhibitorUUIDS)"
          @visible-change="queryComplex(search.exhibitorUUIDS)"
          clearable
          filterable
          remote
          multiple>
        <el-option
            v-for="item in search.complexList"
            :key="item.value"
            :label="item.key"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="客户端">
      <el-select
          style="width: 200px;"
          v-model="search.clientMac"
          placeholder="请选择"
          :remote-method="queryClient(search.exhibitorUUIDS, search.complexIDS)"
          @visible-change="queryClient(search.exhibitorUUIDS, search.complexIDS)"
          clearable
          filterable
          remote
          multiple>
        <el-option
            v-for="item in search.clientList"
            :key="item.value"
            :label="item.key"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="日期" label-width="40px">
      <el-date-picker
          v-model="search.time"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"/>
    </el-form-item>
    <br>
    <el-form-item label="任务类型">
      <el-select
          style="width: 200px;"
          v-model="search.taskType" placeholder="请选择">
        <el-option
            v-for="item in search.taskTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            clearable>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="任务状态">
      <el-select
          style="width: 200px;"
          v-model="search.taskState" placeholder="请选择">
        <el-option
            v-for="item in search.taskStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            clearable>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          icon="el-icon-search"
          @click="queryTask"
      >搜索
      </el-button>
      <el-button
          icon="el-icon-refresh-left"
          @click="search.exhibitorUUIDS=[];search.complexIDS=[];search.clientMac=[];search.logType='';search.logState='所有';search.time=[];"
      >重置
      </el-button>
    </el-form-item>
  </el-form>
  <el-dialog
      title="版本详情"
      v-model="search.isShow">
    <el-table
        :stripe="true"
        :data="search.show">
      <el-table-column
          label="key"
          prop="key"
          width="300"/>
      <el-table-column label="value" prop="value"/>
    </el-table>
  </el-dialog>
  <!-- 搜索结果 -->
  <el-table
      :stripe="true"
      v-loading="search.loading"
      :data="search.table"
      style="width: 100%"
  >
    <el-table-column
        width="200"
        prop="exhibitor_name"
        label="院线"/>
    <el-table-column
        width="200"
        prop="complex_name"
        label="影院"/>
    <el-table-column
        width="150"
        prop="client_mac"
        label="客户端"/>
    <el-table-column
        width="100"
        prop="task_type"
        label="类型"/>
    <el-table-column
        width="100"
        prop="task_state"
        label="状态">
      <template #default="scope">
        <el-tag size="medium" effect="dark" :type="stateColor[scope.row.task_state]">
          {{ scope.row.task_state }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
        width="200"
        prop="created"
        :formatter="formatUnix"
        label="创建时间"/>
    <el-table-column
        width="200"
        prop="last_modified"
        :formatter="formatUnix"
        label="更新时间"/>
    <el-table-column label="命令 / 完成数据" show-overflow-tooltip>
      <template #default="scope">
        <span v-if="scope.row.task_state === 'success' || scope.row.task_state === 'fail'">{{ scope.row.outdata }}</span>
        <span v-else>{{ scope.row.indata }}</span>
      </template>
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="120">
      <template #default="scope">
        <el-button
            icon="el-icon-view"
            size="mini"
            type="primary"
            @click="handleShow(scope.index_, scope.row)">查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-row>
    <el-col :span="2">
      <el-pagination
          style="text-align: left"
          layout="total"
          :total="search.count"/>
    </el-col>
    <el-col :span="20">
      <el-pagination
          style="text-align: center"
          @current-change="handleCurrentChange"
          :total="search.count"
          :page-size="search.pageSize"
          :background="true"
          layout="prev, pager, next">
      </el-pagination>
    </el-col>
    <el-col :span="2">
      <el-pagination
          style="text-align: right"
          @size-change="handleSizeChange"
          :page-size="search.pageSize"
          layout="sizes">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import {reactive} from "vue";
// import {getClient, getComplex, getExhibitor} from "@/utils/api/complex";
// import {formatUnix} from "@/utils/api/base";
// import {ElMessage} from "element-plus";
// import {getTask} from "@/utils/api/task";

export default {
  name: "task",
  methods: {
    handleSizeChange(val) {
      this.search.pageSize = val
      this.queryTask()
    },
    handleCurrentChange(val) {
      this.search.page = val
      this.queryTask()
    },
    // handleShow(index, row) {
    //   const format = ['created', 'last_modified']
    //   this.search.isShow = true
    //   this.search.show = []
    //   for (const item in row) {
    //     this.search.show.push({
    //       'key': item,
    //       "value": format.indexOf(item) === -1 ? row[item] : formatUnix('', '', row[item])
    //     })
    //   }
    //   console.log(this.search.show)
    // },
    queryTask() {
      this.search.loading = true;
    //   getTask(
    //       this.search.exhibitorUUIDS,
    //       this.search.complexIDS,
    //       this.search.clientMac,
    //       this.search.logType,
    //       this.search.logType,
    //       this.search.time[0],
    //       this.search.time[1],
    //       this.search.pageSize,
    //       this.search.page,
    //   ).then(response => {
    //     this.search.table = response['task']
    //     this.search.count = response['count']
    //     this.search.loading = false;
    //     ElMessage.success("搜索成功")
    //   }).catch(() => {
    //     this.search.loading = false;
    //   })
    },
  },
  setup() {
    const newTime = (before) => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - before)
      end.setTime(end.getTime() + 3600 * 1000 * 24)
      return [start, end]
    }

    const shortcuts = [{
      text: '最近一个月',
      value: newTime(3600 * 1000 * 24 * 30),
    }, {
      text: '最近三个月',
      value: newTime(3600 * 1000 * 24 * 90),
    }]

    const search = reactive({
      exhibitorUUIDS: [],
      complexIDS: [],
      clientMac: [],
      taskType: '',
      taskState: '所有',

      exhibitorList: [],
      complexList: [],
      clientList: [],
      taskTypeOptions: [
        {
          value: '',
          label: '所有'
        },
        {
          value: 'command',
          label: '命令'
        },
      ],
      taskStateOptions: [
        {
          value: '',
          label: '所有'
        },
        {
          value: 'pending',
          label: '待执行'
        },
        {
          value: 'running',
          label: '执行中'
        },
        {
          value: 'timeout',
          label: '超时'
        },
        {
          value: 'success',
          label: '成功'
        },
        {
          value: 'fail',
          label: '失败'
        },
      ],

      time: newTime(3600 * 1000 * 24 * 30),

      isShow: false,
      show: '',

      table: [],
      page: 1,
      pageSize: 50,
      count: 0,
      loading: false,
    })
    const stateColor = {
      "pending": 'info',   // 创建任务成功
      "running": '',     // 客户端接收到任务
      "timeout": 'warning', // 执行超时
      "fail": 'danger',  // 失败
      "success": 'success', // 成功
    }

    const queryExhibitor = () => {
    //   getExhibitor().then(response => {
    //     search.exhibitorList = response
    //   }).catch(() => {
    //     search.exhibitorList = []
    //   })
    }

    const queryComplex = (exhibitorUUIDS) => {
    //   getComplex(exhibitorUUIDS).then(response => {
    //     search.complexList = response
    //   }).catch(() => {
    //     search.complexList = []
    //   })
    console.log(exhibitorUUIDS)
    }

    const queryClient = (exhibitorUUIDS, complexIDS) => {
    //   getClient(exhibitorUUIDS, complexIDS).then(response => {
    //     search.clientList = response
    //   }).catch(() => {
    //     search.clientList = []
    //   })
    console.log(exhibitorUUIDS, complexIDS)
    }

    return {shortcuts, search, stateColor,queryExhibitor, queryComplex, queryClient,}//formatUnix}
  }
}
</script>