<template>
  <div id="all">
    <div id="top">
      <CustomCondition @customConditionResult="customConditionResultFind" :salesTagMemberDto='salesTagMemberDto' :findGo='findGo' @loadingGo='loadingGo' :loading='loading' />
    </div>
    <div class="top">
      <div class="head">
        <div class="group">
          <el-tabs v-model="tabNow">
            <el-tab-pane label="群组画像">
              <span slot="label"
                ><img
                  src="../../assets/indexImg/画像灰.png"
                  v-if="tabNow === '1'"
                  alt=""
                />
                <img
                  src="../../assets/indexImg/画像.png"
                  alt=""
                  v-if="tabNow === '0'"
                />
                群组画像</span
              >
            </el-tab-pane>
            <el-tab-pane label="销售员清单">
              <span slot="label"
                ><img
                  src="../../assets/indexImg/清单灰.png"
                  v-if="tabNow === '0'"
                  alt=""
                />
                <img
                  src="../../assets/indexImg/清单.png"
                  alt=""
                  v-if="tabNow === '1'"
                />销售员清单</span
              >
            </el-tab-pane>
          </el-tabs>
          <div class="salesperson">
            <img src="../../assets/indexImg/圆角浅色底框.png" alt="" />
            <div class="info">
              <img src="../../assets/indexImg/群组.png" alt="" />
              <p>销售员总数</p>
              <span>{{ totalCount }}</span>
            </div>
          </div>
          <div class="more">
            <div class="result" @click="handleList" style="width: 85px">
              <img src="../../assets/logo/nameList.png" alt />
              <span>黑白名单</span>
            </div>
            <div class="result" @click="customLabel">
              <img src="../../assets/groupImg/自定义标签.png" alt />
              <span>自定义标签</span>
            </div>
            <div class="result_r" @click="addResultThree" v-if="tabNow === '1'">
              <img src="../../assets/indexImg/筛选.png" alt />
              <span>结果列筛选</span>
            </div>
            <div class="result_t" @click="addResult" v-if="tabNow === '0'">
              <img src="../../assets/indexImg/筛选.png" alt />
              <span>分布指标筛选</span>
            </div>
            <div class="load" @click="down" v-if='user.indexOf("下载") > -1'>
              <img src="../../assets/indexImg/下载.png" alt />
              <span>下载</span>
            </div>
            <div class="load" @click="hadnleSubmit">
              <img src="../../assets/indexImg/保存_1.png" alt />
              <span>保存</span>
            </div>
          </div>
        </div>
        <div class="border1"></div>
      </div>
      <GroupManagementCard
        v-if="tabNow === '0'"
        :resultList='resultList'
        @deleteMap='deleteMap'
        @hadnleSubmitSelf='hadnleSubmitSelf'
        @addCombination='addCombination'
        />
      <div v-if="tabNow === '1'">
        <div class="top_top">操作</div>
        <el-table
          :data="tableData"
          border
          style="margin: auto; width: 98%"
          :header-cell-style="{
            background: '#E6E9F2',
            color: '#000',
            fontWeight: '400'
          }"
          stripe
        >
          <el-table-column width="120" label="工号" prop='sales_code'></el-table-column>
          <el-table-column width="120" label="姓名" prop='sales_name'></el-table-column>
          <el-table-column width="120" label="二级机构名称" prop='sales_comname2'></el-table-column>
          <el-table-column width="120" label="三级机构名称" prop='sales_comname3'></el-table-column>
          <el-table-column width="120" label="机构代码" prop='sales_comcode'></el-table-column>
          <el-table-column width="120" label="机构名称" prop='sales_comname'></el-table-column>
          <el-table-column width="120" label="渠道代码" prop='sales_channelcode'></el-table-column>
          <el-table-column width="120" label="渠道名称" prop='sales_channename'></el-table-column>
          <el-table-column width="120" label="操作" fixed="right" align="left">
            <template slot-scope="res">
              <div class="alignItemOne czBtnList">
                <span class="alignItemOne" @click="gotoSee(res)"> <img src="../../assets/indexImg/查看.png" alt="">查看</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in resultListThree"
            width="120"
            :key="item.head"
            border
            :prop="item.tagFieldName"
            :render-header="() => renderHeaderDate(item.name, index)"
          ></el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            :pager-count="7"
            ref='page'
            @current-change="handleCurrentChange"
            :page-size="10"
            background
            :total="totalCount"
            prev-text="上一页"
            next-text="下一页"
            layout="prev ,pager ,next, jumper, total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      class="dialogSave"
      title="群组保存"
      :visible.sync="submitVisible"
      :close-on-click-modal="false"
      width="689px"
    >
      <div class="submitMessage"></div>
      <el-form label-width="120px">
        <el-form-item label="群组名称：" prop="groupName">
          <el-input v-model="groupName" />
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <!-- <el-form-item label='群组描述：' >
          <el-input v-model="groupDesc" />
        </el-form-item> -->
        <el-form-item label="群组描述：">
          <el-input type="textarea" v-model="groupDesc"></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="120px">
        <!-- <el-form-item label='群组类型：' >
          <el-input v-model="groupType" />
        </el-form-item> -->
        <el-form-item label="群组类型：" prop="groupType">
          <el-select v-model="groupType" placeholder="请选择" size="mini">
            <el-option label="静态群组" value="0"></el-option>
            <el-option label="动态群组" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitVisible = false">取 消</el-button>
        <el-button :loading='loadingSubmit' type="primary" @click="submitOn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="dialogAdd"
      title="自定义标签"
      :close-on-click-modal="false"
      :visible.sync="customLabelVisible"
      width="901px"
    >
      <div class="customLabelMessage"></div>
      <div class="customLabelDialog">
        <div class="customLabelDialog_left">
          <div class="customLabelList">
            <div class="customLabelTitle">自定义标签列表</div>
            <div class="bqs">
              <div v-for="(item, index) in tagList" :key="index" @click="handleClick(index)" class="bq" :style="{ background: (customNow === index) && item.tagName !== '' ? '#CDE7FF' : '' }" >
                {{ item.tagName }}
                <!-- <img v-if="item.tagName !== ''" class="rubbishImg" @click="deleteTagList(index)" src="../../assets/indexImg/删除.png" /> -->
                <div v-if="item.tagName !== ''" class="rubbish" @click="deleteTagList(index)"></div>
              </div>
            </div>
          </div>
          <div class="addNewPatch" @click="handleAddTag">添加新标签</div>
        </div>
        <div class="customLabelDialog_right">
          <div class="customLabelContent" v-if="tagList.length !== 0">
            <div class="customLabelTop">
              标签名称：
              <el-input class="customInp" style="width: 140px" v-model="tagList[customNow].tagNameCopy"/>
              <!-- @blur="handleCheckTagName(tagList[customNow].tagNameCopy)" -->
              <!-- 标签字段名： <el-input class="customInp" style="width: 140px" v-model="tagList[customNow].tagFieldName" /> -->
              标签形式：
              <el-select v-model="tagList[customNow].tagType" @change="changeSelect" style="width: 140px" >
                <el-option value="1" label="公式"></el-option>
                <el-option value="2" label="分组"></el-option>
              </el-select>
            </div>
            <div v-if="tagList[customNow].tagType === '1'" class="Tbase">
              <div class="Tbase_bp">
                <div class="bp_add cursor"></div>
                <div class="bp_CH cursor" @click="addBq('bq')">
                  添加基础标签
                </div>
                <div class="bp_symbol cursor" @click="handleAdd('+')">
                  <img src="../../assets/groupImg/加.png" alt="" />
                </div>
                <div class="bp_symbol cursor" @click="handleAdd('-')">
                  <img src="../../assets/groupImg/减.png" alt="" />
                </div>
                <div class="bp_symbol cursor" @click="handleAdd('*')">
                  <img src="../../assets/groupImg/乘.png" alt="" />
                </div>
                <div class="bp_symbol cursor" @click="handleAdd('/')">
                  <img src="../../assets/groupImg/除.png" alt="" />
                </div>
                <div class="bp_symbol cursor" @click="handleAdd('(')">
                  <img src="../../assets/groupImg/左括.png" alt="" />
                </div>
                <div class="bp_symbol cursor" @click="handleAdd(')')">
                  <img src="../../assets/groupImg/右括.png" alt="" />
                </div>
              </div>
              <div class="hx"></div>
              <el-form label-width="120px">
                <el-form-item label="公式">
                  <el-input v-model="tagList[customNow].groupValue" />
                  <!-- <el-button @click="groupStart">重置</el-button> -->
                </el-form-item>
                <el-form-item label="是否是百分数">
                  <el-select v-model="tagList[customNow].ifpercent">
                    <el-option value="1" label="是"></el-option>
                    <el-option value="0" label="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="tagList[customNow].tagType === '2'" class="group_add">
              <div class="flex operationList">
                <img class="add_logoY cursor" src="../../assets/indexImg/添加.png" />
                <span class="cursor" style='margin-left: 10px; fontSize: 14px; fontWeight: normal;margin-right: 10px' @click="onSelect('select')">选择基础标签</span>
                <span v-if="tagList[customNow].name">
                  <span v-if="tagList[customNow].name.length <= 5" class="Tname">{{ tagList[customNow].name }}</span>
                  <el-tooltip v-if="tagList[customNow].name.length > 5" class="item" effect="light" :content="tagList[customNow].name" placement="top-start">
                    <span class="Tname">{{ tagList[customNow].name }}</span>
                  </el-tooltip>
                </span>
                <div class="fourNew">
                  <div>分组模板：</div>
                  <el-select v-model="tagList[customNow].templateName" @change="handleChangeTemlate">
                    <el-option v-for="(option, index) in templateNameOption" :key='index' :label="option.templateName" :value='option.templateName' />
                  </el-select>
                  <div class="newTemplate" @click="handleAddTagGroupTemplate">另存为新模板</div>
                </div>
                <!-- <div>分组标签</div> -->
                <span @click="addBasicLabel" class="cursor alignCenter" style='fontSize: 14px'>
                  <img class="add_logo cursor" src="../../assets/indexImg/添加.png" style='margin-right: 10px;' />
                  <span class="add_group">添加组别</span>
                </span>
              </div>
              <div class="hx"></div>
              <el-form label-width="100px">
                <el-form-item
                  v-for="(item, index) in tagList[customNow].grouping"
                  :key="index"
                  :label="'组别' + (index + 1) + '：'"
                  id="buds"
                >
                  <el-input v-model="item.groupName" />
                  <div style="width: 40px;"></div>
                  <el-input v-model="item.startValue" />
                  <div style="height: 40px; padding: auto 10px; display: flex;" class="operator fzClass">
                    <!-- <p class="el-icon-arrow-left" style="lineHeight: 40px; marginLeft: 10px; fontWeight: 700; fontSize: 16px;"></p> -->
                    <el-select v-model="item.leftOperator">
                      <el-option label="<" value="<"></el-option>
                      <el-option label="<=" value="<="></el-option>
                      <el-option label="=" value="="></el-option>
                      <el-option label=">=" value=">="></el-option>
                      <el-option label=">" value=">"></el-option>
                    </el-select>
                    <p style="fontSize: 14px;" > 值 </p>
                    <el-select v-model="item.rightOperator">
                      <el-option label="<" value="<"></el-option>
                      <el-option label="<=" value="<="></el-option>
                      <el-option label="=" value="="></el-option>
                      <el-option label=">=" value=">="></el-option>
                      <el-option label=">" value=">"></el-option>
                    </el-select>
                  </div>
                  <el-input v-model="item.endValue" />
                  <!-- v-if="index !== 0" -->
                  <span
                    class="group_close cursor"
                    @click="groupClose(index)"
                    >×</span
                  >
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="customLabelSure">保存标签</el-button>
              <el-button @click="customLabelStart">重 置</el-button>
            </div>
            <div class="groupAdd"></div>
          </div>
        </div>
      </div>
    </el-dialog>
    <div
      class="fixed fixedaaa"
      :style="{ left: fixedLeft, height: windowHeight + 'px', zIndex: 9999 }"
    >
      <div class="fixedHead">
        选择筛选标签
        <i @click="fixedNone" class="el-icon-close" id="deleteIconTwo"></i>
      </div>
      <div class="aaaa">
        <el-input
          class="inputaaa"
          placeholder="输入关键字进行过滤"
          v-model="filterText"
        ></el-input>
        <div class="asd"></div>
        <div id="tree" :style="{ height: windowHeight - 150 + 'px' }">
          <el-tree
            ref="tree"
            class="filter-tree treeOp"
            :data="dataReOld"
            :default-checked-keys="arrTop"
            show-checkbox
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
            @check-change="handleCheckChange"
          ></el-tree>
        </div>
      </div>
    </div>
    <div
      class="fixedResult fixedaaa"
      :style="{ left: fixedLeftResult, height: windowHeight + 'px' }"
    >
      <div class="fixedHead">
        分布指标筛选
        <i @click="fixedResultNone" class="el-icon-close" id="deleteIcon"></i>
      </div>
      <div class="aaaa">
        <el-input
          class="inputaaa"
          placeholder="输入关键字进行过滤"
          v-model="filterTextCopyOne"
        ></el-input>
        <div class="asd"></div>
        <div id="treeTwo" :style="{ height: windowHeight - 150 + 'px' }">
          <el-tree
            ref='treeCopy'
            class="filter-tree aaaa"
            :data="dataRe"
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
            @node-click="handleCheckChangeCopy"
          ></el-tree>
        </div>
      </div>
    </div>
    <div
      class="fixedResult fixedaaa"
      :style="{ left: fixedLeftResultThree, height: windowHeight + 'px' }"
    >
      <div class="fixedHead">
        结果列筛选
        <i
          @click="fixedResultNoneThree"
          class="el-icon-close"
          id="deleteIcon"
        ></i>
      </div>
      <div class="aaaa">
        <el-input
          class="inputaaa"
          placeholder="输入关键字进行过滤"
          v-model="filterTextCopy"
        ></el-input>
        <div class="asd"></div>
        <div id="treeTwo" :style="{ height: windowHeight - 150 + 'px' }">
          <el-tree ref="treeCopyThreeqqq"
            class="filter-tree aaaa"
            :data="treeData"
            show-checkbox
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
            @check-change="handleCheckChangeCopyThree"
          ></el-tree>
        </div>
      </div>
    </div>
    <div
      class="fixedResult fixedaaa"
      :style="{ left: fixedLeftResultBq, height: windowHeight + 'px' }"
    >
      <div class="fixedHead">
        选择基础标签
        <i @click="fixedResultNoneBq" class="el-icon-close" id="deleteIcon"></i>
      </div>
      <div class="aaaa">
        <el-input
          class="inputaaa"
          placeholder="输入关键字进行过滤"
          v-model="filterTextCopyThree"
        ></el-input>
        <div class="asd"></div>
        <div id="treeTwo" :style="{ height: windowHeight - 150 + 'px' }">
          <el-tree
            ref="treeCopyThree"
            class="filter-tree aaaa"
            node-key="id"
            @node-click="handleNodeClick"
            :data="dataReThreee"
            :props="defaultProps"
            :filter-node-method="filterNode"
          ></el-tree>
        </div>
      </div>
    </div>
    <el-dialog width="901px" class="dialogAqua nameList " :visible.sync="listVisible" title="黑白名单" :close-on-click-modal="false">
      <div class="customLabelMessage"></div>
      <el-tabs v-model="nameListNow">
        <el-tab-pane label='黑名单'>
        </el-tab-pane>
        <el-tab-pane label='白名单'>
        </el-tab-pane>
      </el-tabs>
      <div v-if="nameListNow == '0'">
        <div class="nameListTop">
          <el-row>
          <el-form>
            <el-col :span="11">
              <el-form-item label="工号：">
                <el-input v-model="nameListBlack.addId" />
                <el-button class="nameListBtn" @click="addNameListBlack">添加名单</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <div class="HX"></div>
              <el-form-item label="文件：">
                <el-upload
                  name='filename'
                  :show-file-list='false'
                  accept=".csv"
                  :on-success='onSuccess'
                  :on-error='onError'
                  class="upload-demo"
                  :action="nameListBlack.action">
                  <el-button size="small" type="primary">导入名单</el-button>
                </el-upload>
                <p class="blackSpan" @click='handleDown'>导入模板下载</p>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        </div>
          <div class="nameListTitle">
            <img src="../../assets/logo/titleLogo.png" alt /><p>黑名单列表</p>
          </div>
          <div class="nameListHx"></div>
          <div class="nameListBody">
            <el-row>
            <el-form>
              <el-col :span="10">
                <el-form-item label='工号：'>
                  <el-input v-model="nameListBlack.findId"/>
                  <div @click="nameListBlackFind"><img class="nameListFind" src="../../assets/logo/nameListFind.png" /></div>
                </el-form-item>
              </el-col>
                <el-form-item class="deleteNameList">
                <img src="../../assets/logo/nameListDelete.png" @click="deleteAllBlack"  />
                <span class="deleteAll">批量删除</span>
              </el-form-item>
            </el-form>
          </el-row>
          </div>
          <div class="nameListTabel">
            <el-table :data="nameListBlack.data" ref='nameListBlack' @selection-change="handleSelectionChangeBlack" height="420">
            <el-table-column type="selection" width="55" />
            <el-table-column width='60' label='全选' type="index" />
            <el-table-column width='160' label='工号' prop='salesCode' />
            <el-table-column width='120' label='姓名' prop='salesName' />
            <el-table-column width='160' label='二级机构' prop='salesComname2' />
            <el-table-column width='160' label='三级机构' prop='salesComname3' />
            <el-table-column label='操作' align="center">
              <template slot-scope="res">
                <div class="delItem" @click="handleDeleteBlack(res)"><img src="../../assets/strategy/delete.png" alt=""><p>删除</p></div>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <div class="page">
            <el-pagination
              class="pageSet"
              :pager-count="7"
              @current-change="handleNameListBlackChange"
              :page-size="10"
              background
              :total="nameListBlack.total"
              prev-text="上一页"
              next-text="下一页"
              layout="prev ,pager ,next, jumper, total"
            ></el-pagination>
          </div>
      </div>
      <div v-if="nameListNow == '1'">
        <div class="nameListTop">
          <el-row>
          <el-form>
            <el-col :span="11">
              <el-form-item label="工号：">
                <el-input v-model="nameListWhite.addId"/>
                <el-button class="nameListBtn" @click="addNameListWhite">添加名单</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <div class="HX"></div>
              <el-form-item label="文件：">
                <el-upload
                  name='filename'
                  accept=".csv"
                  class="upload-demo"
                  :show-file-list='false'
                  :on-success='onSuccess'
                  :on-error='onError'
                  :action="nameListWhite.action">
                  <el-button size="small" type="primary">导入名单</el-button>
                </el-upload>
                <p class="blackSpan" @click='handleDown'>导入模板下载</p>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        </div>
          <div class="nameListTitle">
            <img src="../../assets/logo/titleLogo.png" alt /><p>白名单列表</p>
          </div>
          <div class="nameListHx"></div>
          <div class="nameListBody">
            <el-row>
            <el-form>
              <el-col :span='10'>
                <el-form-item label='工号：'>
                  <el-input v-model="nameListWhite.findId"/>
                  <div @click="nameListWhiteFind"><img class="nameListFind" src="../../assets/logo/nameListFind.png" /></div>
                </el-form-item>
              </el-col>
              <el-form-item class="deleteNameList">
                <img src="../../assets/logo/nameListDelete.png" @click="deleteAllWhite" />
                <span class="deleteAll">批量删除</span>
              </el-form-item>
            </el-form>
          </el-row>
          </div>
          <div class="nameListTabel">
            <el-table :data='nameListWhite.data' ref='nameListWhite' @selection-change="handleSelectionChangeWhite" height="420">
            <el-table-column type="selection" width="55" />
            <el-table-column width='60' label='全选' type="index" />
            <el-table-column width='160' label='工号' prop='salesCode' />
            <el-table-column width='120' label='姓名' prop='salesName' />
            <el-table-column width='160' label='二级机构' prop='salesComname2' />
            <el-table-column width='160' label='三级机构' prop='salesComname3' />
            <el-table-column label='操作' align="center">
              <template slot-scope="res">
                <div class="delItem" @click="handleDeleteWhite(res)"><img src="../../assets/strategy/delete.png" alt=""><p>删除</p></div>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <div class="page">
            <el-pagination
              class="pageSet"
              :pager-count="7"
              @current-change="handleNameListWhiteChange"
              :page-size="10"
              background
              :total="nameListWhite.total"
              prev-text="上一页"
              next-text="下一页"
              layout="prev ,pager ,next, jumper, total"
            ></el-pagination>
          </div>
      </div>
    </el-dialog>
    <el-dialog title='输入分组名称'
      class="dialogEnter"
      :close-on-click-modal="false"
      :visible.sync="templateNameVisible"
      width="700px"
      @close="delTemplate"
    >
      <div class="submitMessage"></div>
      <el-form>
        <el-form-item label="分组名称">
          <el-input v-model="addTemplateName"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="btns">
        <el-button @click="addTemplate">确定</el-button>
        <el-button @click="delTemplate">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomCondition from '../../common/CustomCondition'
import GroupManagementCard from '../../common/GroupManagementCard'
import {
  findGroupEnumTagClassAndTag,
  postFindSaleGroup,
  postSaveSaleGroup,
  findConditions,
  findGroupPortary,
  findUploadSales,
  customTagList,
  resultTagClassAndTag,
  findNumTagClassAndTag,
  findUserRe,
  checkTagName,
  checkAddGroup,
  formulaCheck,
  findSalesTagMemberPageGroup,
  setReturnDate,
  getReturnDate,
  copySalesNameList
} from '@/api/getApi'
import { salesNameList, getGroupId, addSalesNameList, delSalesNameList, addTagGroupTemplate, getGroupTemplates } from '@/api/nameList'

export default {
  name: 'asd',
  components: {
    CustomCondition,
    GroupManagementCard
  },
  data () {
    return {
      addCombinationIndex: '',
      addCardType: '',
      tagIdMap: '',
      addTemplateName: '',
      addType: '', // top自定义 map 画像
      groupTemplatesStr: '',
      templateNameOption: [],
      templateNameOptionMap: [],
      templateNameVisible: false,
      nameListNow: '0',
      listVisible: false,
      loading: false,
      loadingSubmit: false,
      nameListGroupId: '',
      nameListWhite: {
        data: [],
        addId: '',
        findId: '',
        pageNow: '',
        pageSize: '',
        total: '',
        deleteList: [],
        action: ''
      },
      groupId: '',
      nameListBlack: {
        data: [],
        addId: '',
        findId: '',
        pageNow: '',
        pageSize: '',
        total: '',
        deleteList: [],
        action: ''
      },
      monitorInput: 0,
      finType: '',
      bqVisible: false,
      tabNow: '',
      user: [],
      idArr: [],
      salesTagMemberDto: [],
      filterText: '',
      checkList: ['姓名', '日期', '地址'],
      fixedLeft: '-300px',
      fixedLeftResult: '-300px',
      fixedLeftResultThree: '-300px',
      fixedLeftResultBq: '-300px',
      data: [
        {
          id: 1,
          label: '基本信息',
          children: [
            {
              id: 4,
              label: '个人信息',
              children: [
                {
                  id: '年龄',
                  label: '年龄'
                },
                {
                  id: '性别',
                  label: '性别'
                },
                {
                  id: '入职时间',
                  label: '入职时间'
                }
              ]
            }
          ]
        }
      ],
      dataRe: [],
      dataReThreee: [],
      dataReGs: [], // 公式tree
      dataReFz: [], // 分组tree
      resultList: [],
      inputList: [{}],
      tableData: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      totalCount: 0,
      pageSize: 10,
      pageNow: 1,
      ge: [1, 2],
      channelResult: [], // 渠道结果
      mechanismResult: [],
      props: {
        multiple: true,
        children: 'child',
        label: 'name',
        value: 'id'
      },
      windowHeight: 0,
      arrTop: [],
      filterTextCopy: '',
      activeIndex: '1',
      dialogVisible: false,
      groupingDetail: '',
      customLabelVisible: false, // 自定义标签
      customNow: 0,
      tagListCopy: [{
        groupFields: '',
        tagName: '',
        ifpercent: '0',
        tagFieldName: '',
        tagType: '1', // 1公式 2分组
        groupSwarmsList: [
          {
            groupValue: '',
            groupFields: '',
            tagFieldName: '',
            tagType: '' // 1公式 2分组
          }
        ],
        groupValue: '', // 公式
        labelForm: '',
        grouping: [], // 分组
        name: ''
      }],
      tagList: [{
        groupFields: '',
        tagName: '',
        ifpercent: '0',
        tagFieldName: '',
        tagType: '1', // 1公式 2分组
        groupSwarmsList: [
          {
            groupValue: '',
            groupFields: '',
            tagFieldName: '',
            tagType: '' // 1公式 2分组
          }
        ],
        groupValue: '', // 公式
        labelForm: '',
        grouping: [], // 分组
        name: ''
      }],
      customLabelNow: 0,
      submitVisible: false,
      groupName: '',
      groupDesc: '',
      groupType: '',
      dataReOld: [],
      treeData: [],
      resultListThree: [],
      filterTextCopyOne: '',
      filterTextCopyThree: '',
      indexNow: '',
      error: false,
      tabNowMap: '',
      findGo: false,
      submitCan: false
    }
  },
  mounted () {
    resultTagClassAndTag().then((res) => {
      this.treeData = res.data.data
    })
    if (this.$route.query.operationId) { // 返回到该页面的
      getReturnDate(this.$route.query.operationId).then((res) => {
        this.groupId = res.data.data.groupIdNameList
        this.nameListGroupId = res.data.data.nameListGroupId
        this.nameListBlack.action = `/sit-web/sit/group/uploadFile?groupId=${res.data.data.nameListGroupId}&status=1`
        this.nameListWhite.action = `/sit-web/sit/group/uploadFile?groupId=${res.data.data.nameListGroupId}&status=0`
        this.findGo = !this.findGo
        this.resultList = res.data.data.groupPortList
        this.tagList = res.data.data.tagList
        this.tagListCopy = [].concat(JSON.parse(JSON.stringify(this.tagList)))
        this.groupName = res.data.data.groupName
        this.groupDesc = res.data.data.groupDesc
        this.groupType = res.data.data.groupType
        this.salesTagMemberDto = res.data.data.salesTagMemberDto
        this.resultListThree = res.data.data.resultList
      })
    } else if (this.$route.query.groupId) { // 复制到该页面的
      this.groupId = this.$route.query.groupId
      copySalesNameList(this.$route.query.groupId).then((res) => {
        console.log(res)
        this.nameListGroupId = res.data.data
        this.nameListBlack.action = `/sit-web/sit/group/uploadFile?groupId=${this.nameListGroupId}&status=1`
        this.nameListWhite.action = `/sit-web/sit/group/uploadFile?groupId=${this.nameListGroupId}&status=0`
      })
      const params = { groupId: this.groupId }
      findGroupPortary({ groupId: this.groupId }).then(res => {
        const newArr = []
        const resultList = res.data.data.slice(0)
        function object (a, b) {
          if (b.sortNum === a.sortNum) {
            return a.id - b.id
          } else {
            return a.sortNum - b.sortNum
          }
        }
        resultList.sort(object)
        for (let i = 0; i < resultList.length; i++) {
          resultList[i].type = true
        }
        this.resultList = resultList
        for (let i = 0; i < res.data.data.length; i++) {
          newArr.push(res.data.data[i].tagId)
        }
        this.$refs.treeCopy.setCheckedKeys(newArr)
      })
      customTagList(params).then((res) => {
        this.tagList = res.data.data
        const newArr = this.tagList.slice(0)
        for (let i = 0; i < res.data.data.length; i++) {
          newArr[i].tagNameCopy = this.tagList[i].tagName
        }
        if (res.data.length !== 0) {
          getGroupTemplates({ tagId: res.data.data[0].baseTagId }).then((res) => {
            this.templateNameOption = res.data.data
          })
        }
        this.tagList = newArr
        this.tagListCopy = [].concat(JSON.parse(JSON.stringify(this.tagList)))
      })
      findConditions(params).then((res) => {
        this.findGo = !this.findGo
        this.groupName = res.data.data.groupName
        this.groupDesc = res.data.data.groupDesc
        this.groupType = res.data.data.groupType
        this.strategyList = res.data.data.strategyList
        this.resultListThree = res.data.data.resultList
        this.salesTagMemberDto = res.data.data.salesTagMemberDto
        if (this.$route.query.share) {
          for (let i = 0; i < this.salesTagMemberDto.length; i++) {
            if (this.salesTagMemberDto[i].name === '渠道' || this.salesTagMemberDto[i].name === '机构') {
              this.salesTagMemberDto[i].list = []
              this.salesTagMemberDto[i].mechanismResultList = []
            }
          }
        }
        const newArr = []
        const inputArr = []
        for (let i = 0; i < res.data.data.salesTagMemberDto.length; i++) {
          newArr.push(res.data.data.salesTagMemberDto[i].id)
        }
        this.inputList = inputArr
        this.$refs.tree.setCheckedKeys(newArr)
        const arrThree = []
        for (let i = 0; i < res.data.data.resultList.length; i++) {
          arrThree.push(res.data.data.resultList[i].id)
        }
        this.$refs.treeCopyThreeqqq.setCheckedKeys(arrThree)
        this.monitorInput += 1
      })
    } else { // 创建页面
      getGroupId().then((res) => {
        this.groupId = res.data.data
        this.nameListGroupId = this.groupId
        this.nameListBlack.action = `/sit-web/sit/group/uploadFile?groupId=${this.groupId}&status=1`
        this.nameListWhite.action = `/sit-web/sit/group/uploadFile?groupId=${this.groupId}&status=0`
      })
    }
    this.windowHeight = document.documentElement.clientHeight - 80
    findUserRe().then(res => {
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].resName === '群组画像') {
          for (let j = 0; j < res.data.data[i].children.length; j++) {
            if (res.data.data[i].children[j].resName === '群组创建') {
              this.user = res.data.data[i].children[j].prmsIdentity
            }
          }
        }
      }
    })
    this.getData()
    this.checkChange()
    this.handleCheckChange()
    // setTimeout(() => {
    //   this.find()
    // }, 1000)
    const _this = this
    document.addEventListener('click', function (e) {
      if (e.target.className !== '' && e.target.className !== 'fixedHead' && e.target.className !== 'el-input__inner' && e.target.className !== 'fixedResult fixedaaa') {
        _this.fixedResultNone()
        _this.fixedResultNoneThree()
      }
    })
  },
  watch: {
    checkList () {
      this.checkChange()
    },
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    filterTextCopy (val) { // 2
      this.$refs.treeCopyThreeqqq.filter(val)
    },
    filterTextCopyOne (val) { // 1
      this.$refs.treeCopy.filter(val)
    },
    filterTextCopyThree (val) { // 1
      this.$refs.treeCopyThree.filter(val)
    },
    monitorInput () {
      if (this.monitorInput === 2) {
        setTimeout(() => {
          this.handleCheckChange()
          this.find()
        }, 0)
      }
    },
    tabNow () {
      setTimeout(() => {
        this.tabNowMap = this.tabNow
      }, 0)
    }
  },
  methods: {
    handleAddTagGroupTemplate () {
      if (this.tagList[this.customNow].grouping.length === 0) {
        this.$message.warning('至少添加一个分组')
        return
      }
      for (let i = 0; i < this.tagList[this.customNow].grouping.length; i++) {
        if (isNaN(this.tagList[this.customNow].grouping[i].endValue)) {
          this.$message.warning(`${i + 1}分组结束值不是数字`)
          return
        }
        if (isNaN(this.tagList[this.customNow].grouping[i].startValue)) {
          this.$message.warning(`${i + 1}分组开始值不是数字`)
          return
        }
        if (this.tagList[this.customNow].grouping[i].groupName === '') {
          this.$message.warning('未设置分组名')
          return
        }
        if (this.tagList[this.customNow].grouping[i].startValue === '' && this.tagList[this.customNow].grouping[i].endValue === '') {
          this.$message.warning('至少设置一个值')
          return
        }
      }
      const paramsList = []
      for (let i = 0; i < this.tagList[this.customNow].grouping.length; i++) {
        paramsList.push({
          startValue: this.tagList[this.customNow].grouping[i].startValue,
          endValue: this.tagList[this.customNow].grouping[i].endValue,
          groupName: this.tagList[this.customNow].grouping[i].groupName,
          leftOperator: this.tagList[this.customNow].grouping[i].leftOperator,
          rightOperator: this.tagList[this.customNow].grouping[i].rightOperator
        })
      }
      checkAddGroup(paramsList).then((res) => {
        if (res.data.code !== 0) {
          this.$message.warning(res.data.msg)
        } else {
          this.templateNameVisible = true
          this.addType = 'top'
        }
      })
    },
    delTemplate () {
      this.addTemplateName = ''
      this.templateNameVisible = false
    },
    addTemplate () {
      let params = ''
      if (this.addType === 'top') {
        params = {
          groupSwarmsList: this.tagList[this.customNow].grouping,
          tagId: this.tagList[this.customNow].baseTagId,
          tagName: this.tagList[this.customNow].name,
          templateName: this.addTemplateName
        }
      } else {
        params = {
          groupSwarmsList: this.groupingDetail.groupSwarmsList,
          tagId: this.groupingDetail.id,
          tagName: this.groupingDetail.name,
          templateName: this.addTemplateName
        }
      }
      addTagGroupTemplate(params).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.templateNameVisible = false
          if (this.addType === 'top') {
            this.tagList[this.customNow].templateName = this.addTemplateName
            getGroupTemplates({ tagId: this.groupTemplatesStr.id }).then((res) => {
              this.templateNameOption = res.data.data
              for (let i = 0; i < this.templateNameOption.length; i++) {
                if (this.tagList[this.customNow].templateName === this.templateNameOption[i].templateName) {
                  this.tagList[this.customNow].grouping = this.templateNameOption[i].groupSwarmsList
                }
              }
            })
            this.addTemplateName = ''
          } else {
            getGroupTemplates({ tagId: this.tagIdMap }).then((res) => {
              this.templateNameOptionMap = res.data.data
            })
            this.groupingDetail.templateName = this.addTemplateName
            this.addTemplateName = ''
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleList () { // 获取黑白名单列表
      this.listVisible = true
      this.nameListWhiteFind()
      this.nameListBlackFind()
    },
    groupStart () {
      this.groupStart = ''
      this.tagList[this.customNow].groupValue = ''
      this.tagList[this.customNow].groupSwarmsList[0].tagFieldName = ''
    },
    // handleChange () {
    //   if (this.tagList[this.customNow].tagType === '1') {
    //     this.dataReThreee = this.dataReGs
    //   } else {
    //     this.dataReThreee = this.dataReFz
    //   }
    // },
    // handleCheckTagName (e) {
    //   checkTagName(e).then((res) => {
    //     if (res.data.code !== 0) {
    //       this.$message.error(res.data.msg)
    //     }
    //   })
    // },
    groupClose (index) {
      const newArr = this.tagList.slice(0)
      newArr[this.customNow].grouping.splice(index, 1)
      this.tagList = newArr
    },
    addBasicLabel () {
      // 添加基础标签
      if (this.tagList[this.customNow].name === '') {
        this.$message.warning('请选择基础标签')
        return
      }
      this.tagList[this.customNow].grouping.push({
        groupName: '',
        startValue: '',
        leftOperator: '<',
        rightOperator: '<=',
        endValue: ''
      })
    },
    deleteTagList (index) {
      setTimeout(() => {
        this.customNow = 0
        const newArr = this.tagList.slice(0)
        newArr.splice(index, 1)
        this.tagList = newArr
        this.tagListCopy = newArr
      }, 0)
    },
    handleAddTag () {
      this.templateNameOption = []
      let can = true
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].tagName === '') {
          can = false
        }
      }
      if (can) {
        this.tagList.push({
          groupFields: '',
          tagName: '',
          ifpercent: '0',
          tagFieldName: '',
          tagType: '1', // 1公式 2分组
          groupSwarmsList: [
            {
              groupValue: '',
              groupFields: '',
              tagFieldName: '',
              tagType: '' // 1公式 2分组
            }
          ],
          groupValue: '', // 公式
          labelForm: '',
          grouping: [], // 分组
          name: ''
        })
        this.customNow = this.tagList.length - 1
      } else {
        this.$message.error('请先对当前标签进行编辑')
      }
    },
    customLabelSure () {
      if (!this.tagList[this.customNow].tagNameCopy) {
        this.$message.warning('请设置标签名称')
        return
      }
      if (this.tagList[this.customNow].tagType === '2') { // 对分组进行判断
        for (let i = 0; i < this.tagList[this.customNow].grouping.length; i++) {
          if (this.tagList[this.customNow].grouping === 0) {
            this.$message.warning('至少添加一个分组')
            return
          }
          if (isNaN(this.tagList[this.customNow].grouping[i].endValue)) {
            this.$message.warning(`${i + 1}分组结束值不是数字`)
            return
          }
          if (isNaN(this.tagList[this.customNow].grouping[i].startValue)) {
            this.$message.warning(`${i + 1}分组开始值不是数字`)
            return
          }
          if (this.tagList[this.customNow].grouping[i].groupName === '') {
            this.$message.warning('未设置分组名')
            return
          }
          if (this.tagList[this.customNow].grouping[i].startValue === '' && this.tagList[this.customNow].grouping[i].endValue === '') {
            this.$message.warning('至少设置一个值')
            return
          }
        }
      }
      this.error = false
      if (this.tagList[this.customNow].tagType === '1') { // 公式
        for (let i = 0; i < this.tagList.length; i++) {
          if (i !== this.customNow) {
            if (this.tagList[this.customNow].tagNameCopy === this.tagList[i].tagNameCopy) {
              this.$message.error('存在相同标签名')
              return
            }
          }
        }
        let num = 0
        checkTagName(this.tagList[this.customNow].tagNameCopy).then((res) => {
          if (res.data.code !== 0) {
            this.$message.error(res.data.msg)
          } else {
            num += 1
            if (num === 2) {
              this.$message.success('保存成功')
              this.tagList[this.customNow].tagName = this.tagList[this.customNow].tagNameCopy
              this.tagListCopy = [].concat(JSON.parse(JSON.stringify(this.tagList)))
            }
          }
        })
        const params = {
          tagFieldName: this.tagList[this.customNow].groupSwarmsList[0].tagFieldName,
          groupFields: this.tagList[this.customNow].groupSwarmsList[0].groupFields,
          groupValue: this.tagList[this.customNow].groupValue
        }
        formulaCheck(params).then((res) => {
          if (res.data.code === 0) {
            num += 1
          } else {
            this.$message.error(res.data.msg)
          }
          if (num === 2) {
            this.$message.success('保存成功')
            this.tagList[this.customNow].tagName = this.tagList[this.customNow].tagNameCopy
            this.tagListCopy = [].concat(JSON.parse(JSON.stringify(this.tagList)))
          }
        })
      } else {
        const paramsList = []
        for (let i = 0; i < this.tagList[this.customNow].grouping.length; i++) {
          paramsList.push({
            startValue: this.tagList[this.customNow].grouping[i].startValue,
            endValue: this.tagList[this.customNow].grouping[i].endValue,
            groupName: this.tagList[this.customNow].grouping[i].groupName,
            leftOperator: this.tagList[this.customNow].grouping[i].leftOperator,
            rightOperator: this.tagList[this.customNow].grouping[i].rightOperator
          })
        }
        checkAddGroup(paramsList).then((res) => {
          if (res.data.code !== 0) {
            this.$message.warning(res.data.msg)
          } else {
            this.tagList[this.customNow].tagName = this.tagList[this.customNow].tagNameCopy
            this.tagListCopy = [].concat(JSON.parse(JSON.stringify(this.tagList)))
            this.$message.success('添加成功')
          }
        })
      }
    },
    customLabelStart () {
      const newArr = this.tagList.slice(0)
      newArr[this.customNow] = {
        tagFiledName: '',
        tagName: '',
        tagNameCopy: '',
        ifpercent: '0',
        tagFieldName: '',
        tagType: '1', // 1公式 2分组
        groupSwarmsList: [{
          groupValue: [] // 公式
        }],
        groupValue: '', // 公式
        grouping: [], // 分组
        labelForm: ''
      }
      this.tagList = newArr
    },
    handleAdd (item) {
      this.tagList[this.customNow].groupValue += item
      if (this.tagList[this.customNow].groupSwarmsList[0].tagFieldName) {
        this.tagList[this.customNow].groupSwarmsList[0].tagFieldName += item
      } else {
        this.tagList[this.customNow].groupSwarmsList[0].tagFieldName = item
      }
    },
    customLabel () {
      this.customLabelVisible = true
    },
    hadnleSubmitSelf (item, index) {
      if (item.title === '') {
        this.$message.warning('主标签请输入标题')
        this.error = true
        return
      }
      if (item.picType === '') {
        this.$message.warning('主标签请选择图形')
        this.error = true
        return
      }
      if (item.valueType === '1') {
        if (item.groupSwarmsList.length === 0) {
          this.$message.warning('主标签至少添加一个分组')
          this.error = true
          return
        }
        for (let i = 0; i < item.groupSwarmsList.length; i++) {
          if (isNaN(item.groupSwarmsList[i].endValue)) {
            this.$message.warning('主标签分组结束值不是数字')
            this.error = true
            return
          }
          if (isNaN(item.groupSwarmsList[i].startValue)) {
            this.$message.warning('主标签分组开始值不是数字')
            this.error = true
            return
          }
          if (item.groupSwarmsList[i].groupName === '') {
            this.$message.warning('主标签未设置分组名')
            this.error = true
            return
          }
          if (item.groupSwarmsList[i].startValue === '' && item.groupSwarmsList[i].endValue === '') {
            this.$message.warning('主标签分组至少设置一个值')
            this.error = true
            return
          }
        }
      }
      // this.resultList[index].type = false
      if (item.flag === '1') {
        if (!item.secondTagId) {
          this.error = true
          this.$message.warning('请选择组合标签')
          return
        }
        if (item.secondValueType === '1' && item.secondGroupSwarmsList.length === 0) {
          this.error = true
          this.$message.warning('组合标签分组至少设置一个值')
          return
        }
        for (let i = 0; i < item.secondGroupSwarmsList.length; i++) {
          if (isNaN(item.secondGroupSwarmsList[i].endValue)) {
            this.$message.warning('组合标签分组结束值不是数字')
            this.error = true
            return
          }
          if (isNaN(item.secondGroupSwarmsList[i].startValue)) {
            this.$message.warning('组合标签分组开始值不是数字')
            this.error = true
            return
          }
          if (item.secondGroupSwarmsList[i].groupName === '') {
            this.$message.warning('组合标签未设置分组名')
            this.error = true
            return
          }
          if (item.secondGroupSwarmsList[i].startValue === '' && item.secondGroupSwarmsList[i].endValue === '') {
            this.$message.warning('组合分组至少设置一个值')
            this.error = true
            return
          }
        }
      }
      this.error = false
      console.log(item)
      const params = {
        groupId: this.nameListGroupId,
        groupPortList: [
          {
            groupSwarmsList: item.groupSwarmsList,
            secondGroupSwarmsList: item.secondGroupSwarmsList,
            picType: item.select,
            tagName: item.tagName,
            tagId: item.id,
            valueType: item.valueType,
            enumerateData: item.enumerateData,
            title: item.name,
            secondTagId: item.secondTagId,
            secondTagName: item.secondTagName,
            secondValueType: item.secondValueType,
            secondTagFieldName: item.secondTagFieldName,
            width: item.width,
            flag: item.flag,
            secondEnumerateData: item.secondEnumerateData
          }
        ],
        saleList: [
          {
            actual_rank: '客户经理一级',
            age: '41',
            sales_status: '1'
          },
          {
            actual_rank: '客户经理一级',
            age: '26',
            sales_status: '2'
          }
        ],
        salesTagMemberDto: this.salesTagMemberDto
      }
      postFindSaleGroup(params).then(res => {
        item.params = res.data.data
        var itemNew = JSON.parse(JSON.stringify(this.resultList))
        itemNew[index].params = res.data.data
        this.resultList = itemNew
        const newArrList = this.resultList.slice(0)
        newArrList[index].type = false
        this.resultList = newArrList
      })
    },
    addCombination (index) {
      this.addCardType = 'addCombination'
      this.fixedLeftResult = '35px'
      this.addCombinationIndex = index
    },
    submitOn () {
      if (this.groupName === '') {
        this.$message.warning('请填写群组名称')
        return
      }
      if (this.groupType === '') {
        this.$message.warning('请填写群组类型')
        return
      }
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].tagName === '') {
          this.tagList.splice(i, 1)
        }
      }
      for (let i = 0; i < this.tagList.length; i++) {
        if (this.tagList[i].tagType === '1') {
          this.tagList[i].groupSwarmsList[0].groupValue = this.tagList[
            i
          ].groupValue
        } else {
          this.tagList[i].groupSwarmsList = this.tagList[i].grouping
        }
      }
      const arr = this.tagList
      const paramsList = []
      for (let i = 0; i < this.resultListThree.length; i++) {
        paramsList.push(this.resultListThree[i])
      }
      const params = {
        groupPortList: this.resultList,
        tagList: arr,
        groupName: this.groupName,
        groupDesc: this.groupDesc,
        groupType: this.groupType,
        salesTagMemberDto: this.salesTagMemberDto,
        resultList: paramsList,
        groupId: this.nameListGroupId
      }
      this.loadingSubmit = true
      postSaveSaleGroup(params).then((res) => {
        this.loadingSubmit = false
        if (res.data.code === 0) {
          this.$router.push('/groupManagement/polling')
          // this.$router.push(`/groupManagement/Update?groupId=${res.data.data}`)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        this.loadingSubmit = false
      })
    },
    hadnleSubmit () {
      if (!this.submitCan) {
        this.$message.error('请先点击查询按钮然后进行保存')
        return
      }
      for (let i = 0; i < this.resultList.length; i++) {
        this.hadnleSubmitSelf(this.resultList[i], i)
      }
      if (!this.error) {
        this.submitVisible = true
      }
    },
    deleteOne (e) {
      for (let i = 0; i < this.inputList.length; i++) {
        if (this.inputList[i].name === e.name) {
          this.inputList.splice(i, 1)
        }
      }
      const onArr = []
      for (let i = 0; i < this.inputList.length; i++) {
        onArr.push(this.inputList[i].id)
      }
      this.$refs.tree.setCheckedKeys(onArr)
    },
    startOn () {
      this.channelResult = []
      this.mechanismResult = []
      for (let i = 0; i < this.inputList.length; i++) {
        if (this.inputList[i].tagValueType === '2') {
          this.inputList[i].model = []
        } else {
          this.inputList[i].model = ''
        }
        this.inputList[i].modela = ''
        this.inputList[i].modelb = ''
      }
    },
    down () {
      const list = []
      for (let i = 0; i < this.mechanismResult.length; i++) {
        list.push(this.mechanismResult[i].slice(-1).toString())
      }
      const paramsList = [{
        name: '工号',
        tagFieldName: 'sales_code'
      }, {
        name: '姓名',
        tagFieldName: 'sales_name'
      }, {
        name: '二级机构名称',
        tagFieldName: 'sales_comname2'
      }, {
        name: '三级机构名称',
        tagFieldName: 'sales_comname3'
      }, {
        name: '机构代码',
        tagFieldName: 'sales_comcode'
      }, {
        name: '机构名称',
        tagFieldName: 'sales_comname'
      }, {
        name: '渠道代码',
        tagFieldName: 'sales_channelcode'
      }, {
        name: '渠道名称',
        tagFieldName: 'sales_channename'
      }]
      for (let i = 0; i < this.resultListThree.length; i++) {
        paramsList.push(this.resultListThree[i])
      }
      const params = {
        salesTagMemberDto: this.salesTagMemberDto,
        resultList: paramsList,
        groupId: this.groupId
      }
      const url = location.host
      findUploadSales(params).then(res => {
        if (res.data.code === 0) {
          // window.open(`http://${url}/sit-web/sit/salesTag/uploadSales?jId=${res.data.data}`)
          window.open(
            `http://${url}/sit-web/sit/salesTag/uploadSalesForGroup?loadFlag=2&jId=${res.data.data}`
          )
        }
      })
    },
    handleCurrentChange (val) {
      this.pageNow = val
      findSalesTagMemberPageGroup(this.pageNow, this.pageSize, this.nameListGroupId, this.salesTagMemberDto).then(
        res => {
          this.submitCan = true
          this.loading = false
          this.mapNum += 1
          this.tableData = res.data.data.list
          this.totalCount = res.data.data.totalCount
        }
      ).catch(() => {
        this.loading = false
      })
    },
    handleClick (index) {
      this.customNow = index
      this.tagList = [].concat(JSON.parse(JSON.stringify(this.tagListCopy)))
      if (this.tagList[this.tagList.length - 1].tagName === '' && (this.tagList.length - 1) !== index) {
        const newArr = this.tagList
        newArr.splice(this.tagList.length - 1, 1)
      }
      getGroupTemplates({ tagId: this.tagList[index].baseTagId }).then((res) => {
        this.templateNameOption = res.data.data
      })
    },
    checkChange () {
      const arr = []
      this.resultList = arr
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getData () {
      // postGroup().then(res => {
      //   this.dataReOld = res.data.data
      //   this.monitorInput += 1
      // })
      findGroupEnumTagClassAndTag().then(res => {
        this.dataRe = res.data.data
        this.dataReFz = res.data.data
        this.monitor += 1
      })
      findNumTagClassAndTag().then((res) => {
        this.dataReGs = res.data.data
        this.dataReThreee = res.data.data
      })
    },
    renderHeaderDate (data, index) {
      const _this = this
      const name = this.resultListThree[index].name
      if (
        name !== '姓名' &&
        name !== '工号' &&
        name !== '机构代码' &&
        name !== '渠道名称' &&
        name !== '渠道代码' &&
        name !== '机构名称'
      ) {
        return (
          <div class='flexBetween'>
            <span>{name}</span>
            <i
              onClick={() => {
                _this.deleteResult(index)
              }}
              class='el-icon-close'
            ></i>
          </div>
        )
      } else {
        return (
          <div class='flexBetween'>
            <span>{name}</span>
            <i></i>
          </div>
        )
      }
    },
    deleteResult (e) {
      const arr = this.resultListThree.slice(0)
      arr.splice(e, 1)
      this.resultListThree = arr
      const idArr = []
      for (let i = 0; i < this.resultListThree.length; i++) {
        idArr.push(this.resultListThree[i].id)
      }
      this.$refs.treeCopyThreeqqq.setCheckedKeys(idArr)
    },
    gotoSee (res) {
      const params = {
        groupPortList: this.resultList,
        tagList: this.tagList,
        groupName: this.groupName,
        groupDesc: this.groupDesc,
        groupType: this.groupType,
        salesTagMemberDto: this.salesTagMemberDto,
        resultList: this.resultListThree,
        groupId: this.$route.query.groupId,
        groupIdNameList: this.groupId,
        nameListGroupId: this.nameListGroupId
      }
      setReturnDate(params).then((setReturn) => {
        this.$router.push({ path: `/portrait?sales_code=${res.row.sales_code}&historySec=/groupManagement/create&groupId=${this.$route.query.groupId}&operationId=${setReturn.data.data}&history=${this.$route.query.history}&firId=${this.$route.query.firId}&share=${this.$route.query.share}` })
      })
    },
    addInput () {
      this.fixedLeft = '35px'
    },
    fixedNone () {
      this.fixedLeft = '-300px'
    },
    handleCheckChange (res) {
      const dataOn = this.$refs.tree.getCheckedNodes()
      const oldArr = this.inputList
      const newResult = []
      for (let i = 0; i < dataOn.length; i++) {
        if (dataOn[i].tagFieldName) {
          if (oldArr.length === 0) {
            // 之没前有选项 添加空属性
            if (dataOn[i].tagValueType === '1') {
              newResult.push({
                tagFieldName: dataOn[i].tagFieldName,
                id: dataOn[i].id,
                tagId: dataOn[i].tagId,
                name: dataOn[i].name,
                tagValueType: dataOn[i].tagValueType,
                enumerateData: dataOn[i].enumerateData,
                modela: '',
                modelb: ''
              })
            } else if (dataOn[i].tagValueType === '3') {
              newResult.push({
                tagFieldName: dataOn[i].tagFieldName,
                tagId: dataOn[i].tagId,
                id: dataOn[i].id,
                name: dataOn[i].name,
                tagValueType: dataOn[i].tagValueType,
                enumerateData: dataOn[i].enumerateData,
                model: []
              })
            } else {
              newResult.push({
                tagFieldName: dataOn[i].tagFieldName,
                id: dataOn[i].id,
                tagId: dataOn[i].tagId,
                name: dataOn[i].name,
                tagValueType: dataOn[i].tagValueType,
                enumerateData: dataOn[i].enumerateData,
                modal: ''
              })
            }
          } else {
            // 之前有选项
            let num = -10
            for (let j = 0; j < oldArr.length; j++) {
              if (dataOn[i].id === oldArr[j].id) {
                num = j
              }
            }
            if (num !== -10) {
              // 继承属性
              if (dataOn[i].tagValueType === '1') {
                newResult.push({
                  tagFieldName: dataOn[i].tagFieldName,
                  id: dataOn[i].id,
                  tagId: dataOn[i].tagId,
                  name: dataOn[i].name,
                  tagValueType: dataOn[i].tagValueType,
                  enumerateData: dataOn[i].enumerateData,
                  modela: oldArr[num].startFiledName,
                  modelb: oldArr[num].endFiledName
                })
              } else if (dataOn[i].tagValueType === '2') {
                newResult.push({
                  tagFieldName: dataOn[i].tagFieldName,
                  tagId: dataOn[i].tagId,
                  id: dataOn[i].id,
                  name: dataOn[i].name,
                  tagValueType: dataOn[i].tagValueType,
                  enumerateData: dataOn[i].enumerateData,
                  model: oldArr[num].list
                })
              } else if (dataOn[i].tagValueType === '3') {
                newResult.push({
                  tagFieldName: dataOn[i].tagFieldName,
                  tagId: dataOn[i].tagId,
                  id: dataOn[i].id,
                  name: dataOn[i].name,
                  tagValueType: dataOn[i].tagValueType,
                  enumerateData: dataOn[i].enumerateData,
                  model: [oldArr[num].startDate, oldArr[num].endDate]
                })
              } else {
                newResult.push({
                  tagFieldName: dataOn[i].tagFieldName,
                  id: dataOn[i].id,
                  tagId: dataOn[i].tagId,
                  name: dataOn[i].name,
                  tagValueType: dataOn[i].tagValueType,
                  enumerateData: dataOn[i].enumerateData,
                  model: oldArr[num].value
                    ? oldArr[num].value
                    : oldArr[num].model
                })
              }
            } else {
              // 添加空属性
              if (dataOn[i].tagValueType === '1') {
                newResult.push({
                  tagFieldName: dataOn[i].tagFieldName,
                  id: dataOn[i].id,
                  tagId: dataOn[i].tagId,
                  name: dataOn[i].name,
                  tagValueType: dataOn[i].tagValueType,
                  enumerateData: dataOn[i].enumerateData,
                  modela: '',
                  modelb: ''
                })
              } else if (dataOn[i].tagValueType === '3') {
                newResult.push({
                  tagFieldName: dataOn[i].tagFieldName,
                  tagId: dataOn[i].tagId,
                  id: dataOn[i].id,
                  name: dataOn[i].name,
                  tagValueType: dataOn[i].tagValueType,
                  enumerateData: dataOn[i].enumerateData,
                  model: []
                })
              } else {
                newResult.push({
                  tagFieldName: dataOn[i].tagFieldName,
                  id: dataOn[i].id,
                  tagId: dataOn[i].tagId,
                  name: dataOn[i].name,
                  tagValueType: dataOn[i].tagValueType,
                  enumerateData: dataOn[i].enumerateData,
                  modal: ''
                })
              }
            }
          }
        }
      }
      this.inputList = newResult
    },
    handleCheckChangeCopy (res) {
      const newResult = this.resultList.slice(0)
      if (res.tagFieldName) {
        if (this.addCardType === 'addCombination') {
          if (newResult[this.addCombinationIndex].id === res.id) {
            this.$message.warning('标签重复')
          } else {
            console.log(newResult[this.addCombinationIndex])
            newResult[this.addCombinationIndex].secondTagId = res.tagId
            newResult[this.addCombinationIndex].secondTagName = res.name
            newResult[this.addCombinationIndex].secondValueType = res.valueType
            newResult[this.addCombinationIndex].secondTagFieldName = res.tagFieldName
            newResult[this.addCombinationIndex].secondEnumerateData = res.enumerateData
            newResult[this.addCombinationIndex].flag = '1'
            newResult[this.addCombinationIndex].secondGroupSwarmsList = []
            newResult[this.addCombinationIndex].templateNameSecond = ''
          }
        } else {
          newResult.push({
            name: res.name,
            tagName: res.tagFieldName,
            id: res.id,
            enumerateData: res.enumerateData,
            title: res.name,
            picType: '',
            valueType: res.valueType,
            groupSwarmsList: [],
            secondGroupSwarmsList: [],
            width: 1,
            flag: 0,
            addCombination: '',
            sortNum: Date.parse(new Date())
          })
        }
      }
      this.resultList = newResult
    },
    handleCheckChangeCopyThree () {
      const dataOn = this.$refs.treeCopyThreeqqq.getCheckedNodes()
      const arr = []
      for (let i = 0; i < dataOn.length; i++) {
        if (dataOn[i].tagFieldName) {
          arr.push({
            name: dataOn[i].name,
            tagFieldName: dataOn[i].tagFieldName,
            id: dataOn[i].id
          })
        }
      }
      this.resultListThree = arr
    },
    addResult () {
      this.fixedLeftResult = '35px'
      this.addCardType = 'add'
    },
    addResultThree () {
      this.fixedLeftResultThree = '35px'
    },
    fixedResultNone () {
      this.fixedLeftResult = '-300px'
    },
    fixedResultNoneThree () {
      this.fixedLeftResultThree = '-300px'
    },
    addBq () {
      // 自定义标签添加基础标签
      this.fixedLeftResultBq = '35px'
      this.finType = 'bq'
    },
    fixedResultNoneBq () {
      this.fixedLeftResultBq = '-300px'
    },
    handleChangeTemlate (e) {
      for (let i = 0; i < this.templateNameOption.length; i++) {
        if (e === this.templateNameOption[i].templateName) {
          this.tagList[this.customNow].grouping = this.templateNameOption[i].groupSwarmsList
        }
      }
    },
    handleNodeClick (res) {
      this.groupTemplatesStr = res
      if (res.tagFieldName) {
        this.tagList[this.customNow].templateName = ''
        this.tagList[this.customNow].grouping = []
        if (this.tagList[this.customNow].tagType === '2') {
          getGroupTemplates({ tagId: res.id }).then((res) => {
            this.templateNameOption = res.data.data
          })
        }
        if (this.finType === 'bq') {
          console.log(this.tagList[this.customNow].groupSwarmsList[0])
          if (this.tagList[this.customNow].groupSwarmsList[0].groupFields) {
            this.tagList[this.customNow].groupSwarmsList[0].groupFields += res.tagFieldName + ','
          } else {
            this.tagList[this.customNow].groupSwarmsList[0].groupFields = res.tagFieldName + ','
          }
          if (this.tagList[this.customNow].groupSwarmsList[0].tagFieldName) {
            this.tagList[this.customNow].groupSwarmsList[0].tagFieldName += '#' + res.tagFieldName + '#'
          } else {
            this.tagList[this.customNow].groupSwarmsList[0].tagFieldName = '#' + res.tagFieldName + '#'
          }
          this.tagList[this.customNow].groupValue += '#' + res.name + '#'
        } else {
          const newArr = this.tagList.slice(0)
          newArr[this.customNow].customTagFiledName = res.tagFieldName
          newArr[this.customNow].baseTagId = res.id
          newArr[this.customNow].name = res.name
          newArr[this.customNow].groupFields = '#' + res.tagFieldName + ','
          this.tagList = newArr
        }
      }
    },
    onSelect () {
      this.fixedLeftResultBq = '35px'
      this.finType = 'select'
    },
    deleteMap (e) {
      this.resultList.splice(e, 1)
      const newArr = []
      for (let i = 0; i < this.resultList.length; i++) {
        newArr.push(this.resultList[i].id)
      }
      this.$refs.treeCopy.setCheckedKeys(newArr)
    },
    customConditionResultFind (data) {
      if (this.$refs.page) {
        this.$refs.page.internalCurrentPage = 1
      }
      this.pageNow = 1
      this.salesTagMemberDto = data
      console.log(data)
      findSalesTagMemberPageGroup(this.pageNow, this.pageSize, this.nameListGroupId, data).then(
        res => {
          this.submitCan = true
          this.loading = false
          this.tableData = res.data.data.list
          this.totalCount = res.data.data.totalCount
          for (let i = 0; i < this.resultList.length; i++) {
            this.hadnleSubmitSelf(this.resultList[i], i)
          }
        }
      ).catch(() => {
        this.loading = false
      })
    },
    customConditionResult (data) {
      console.log('chazhao')
      this.salesTagMemberDto = data
      findSalesTagMemberPageGroup(this.pageNow, this.pageSize, this.nameListGroupId, data).then(
        res => {
          this.submitCan = true
          this.loading = false
          this.mapNum += 1
          this.tableData = res.data.data.list
          this.totalCount = res.data.data.totalCount
          for (let i = 0; i < this.resultList.length; i++) {
            this.hadnleSubmitSelf(this.resultList[i], i)
          }
        }
      ).catch(() => {
        this.loading = false
      })
    },
    loadingGo (loading) {
      this.loading = loading
    },
    nameListBlackFind () { // 查询黑名单列表
      const params = {
        status: '1',
        salesCode: this.nameListBlack.findId,
        groupId: this.nameListGroupId,
        pageSize: this.nameListBlack.pageSize,
        pageNow: this.nameListBlack.pageNow
      }
      salesNameList(params).then((res) => {
        this.nameListBlack.data = res.data.data.list
        this.nameListBlack.total = res.data.data.totalCount
      })
    },
    nameListWhiteFind () { // 查询白名单列表
      const params = {
        status: '0',
        salesCode: this.nameListWhite.findId,
        groupId: this.nameListGroupId,
        pageSize: this.nameListWhite.pageSize,
        pageNow: this.nameListWhite.pageNow
      }
      salesNameList(params).then((res) => {
        this.nameListWhite.data = res.data.data.list
        this.nameListWhite.total = res.data.data.totalCount
      })
    },
    addNameListWhite () { // 添加白名单
      const params = {
        salesCode: this.nameListWhite.addId,
        groupId: this.nameListGroupId,
        status: 0
      }
      addSalesNameList(params).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.nameListWhiteFind()
          this.customConditionResult(this.salesTagMemberDto)
          this.nameListWhite.addId = ''
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    addNameListBlack () { // 添加黑名单
      const params = {
        salesCode: this.nameListBlack.addId,
        groupId: this.nameListGroupId,
        status: 1
      }
      addSalesNameList(params).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.nameListBlackFind()
          this.customConditionResult(this.salesTagMemberDto)
          this.nameListBlack.addId = ''
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleNameListWhiteChange (val) { // 白名单翻页
      this.nameListWhite.pageNow = val
      this.nameListWhiteFind()
    },
    handleNameListBlackChange (val) { // 黑名单翻页
      this.nameListBlack.pageNow = val
      this.nameListBlackFind()
    },
    handleSelectionChangeBlack (e) { // 选中黑名单
      this.nameListBlack.deleteList = e
    },
    handleSelectionChangeWhite (e) { // 选中白名单
      this.nameListWhite.deleteList = e
    },
    handleDeleteWhite (e) { // 删除白名单
      const salesCodeList = []
      salesCodeList.push(e.row.salesCode)
      const params = {
        groupId: this.nameListGroupId,
        status: 1,
        salesCodeList
      }
      delSalesNameList(params).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.nameListWhiteFind()
          this.customConditionResult(this.salesTagMemberDto)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleDeleteBlack (e) { // 删除黑名单
      const salesCodeList = []
      salesCodeList.push(e.row.salesCode)
      const params = {
        groupId: this.nameListGroupId,
        status: 0,
        salesCodeList
      }
      delSalesNameList(params).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.nameListBlackFind()
          this.customConditionResult(this.salesTagMemberDto)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    deleteAllBlack () { // 批量删除黑名单
      if (this.nameListBlack.deleteList.length === 0) {
        return
      }
      const salesCodeList = []
      for (let i = 0; i < this.nameListBlack.deleteList.length; i++) {
        salesCodeList.push(this.nameListBlack.deleteList[i].salesCode)
      }
      const params = {
        groupId: this.nameListGroupId,
        status: 0,
        salesCodeList
      }
      delSalesNameList(params).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.nameListBlackFind()
          this.customConditionResult(this.salesTagMemberDto)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    deleteAllWhite () { // 批量删除白名单
      if (this.nameListWhite.deleteList.length === 0) {
        return
      }
      const salesCodeList = []
      for (let i = 0; i < this.nameListWhite.deleteList.length; i++) {
        salesCodeList.push(this.nameListWhite.deleteList[i].salesCode)
      }
      const params = {
        groupId: this.nameListGroupId,
        status: 1,
        salesCodeList
      }
      delSalesNameList(params).then((res) => {
        if (res.data.code === 0) {
          this.$message.success(res.data.msg)
          this.nameListWhiteFind()
          this.customConditionResult(this.salesTagMemberDto)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    onSuccess (e) { // 上传文件成功
      if (e.code === 0) {
        this.$message.success(e.msg)
        this.nameListBlackFind()
        this.nameListWhiteFind()
        this.customConditionResult(this.salesTagMemberDto)
      } else if (e.code === 100) {
        const url = location.host
        this.$message.error('操作失败')
        window.open(`http://${url}/sit-web/sit/group/getErrorFile?id=${e.msg}`)
      } else if (e.code === 300) {
        this.$message.warning('部分数据失败')
        this.nameListBlackFind()
        this.nameListWhiteFind()
        this.customConditionResult(this.salesTagMemberDto)
        const url = location.host
        window.open(`http://${url}/sit-web/sit/group/getErrorFile?id=${e.msg}`)
      } else {
        this.$message.error(e.msg)
      }
    },
    onError (e) { // 上传文件失败
      if (e.code === 0) {
        this.$message.success(e.msg)
      } else {
        this.$message.error(e.msg)
      }
    },
    handleDown () { // 文件导入
      const url = location.host
      window.open(`http://${url}/sit-web/sit/group/downloadFile`)
      // window.open('sit-web/sit/group/downloadFile')
    },
    changeSelect () {
      this.fixedResultNoneBq()
    }
  }
}
</script>
<style>
.alignItem {
  display: flex;
  align-items: center;
}
.noneBut {
  height: 40px;
}

.hx {
  padding: 0 10px;
}
.db_hx {
  padding: 0 10px;
}
.el-cascader__tags {
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
  overflow: hidden;
}
</style>
<style lang="less" scoped>
/deep/ .el-table td, .el-table th .el-table_1_column_9{
  padding: 6px 0 !important;
}
/deep/ .el-table td, .el-table th .el-table_2_column_18{
  padding: 6px 0 !important;
}
/deep/ .el-table th{
  padding: 6px 0 !important;
}
/deep/ .el-row--flex.is-justify-end{
  margin-right: 1%;
}
// /deep/ [data-v-4164c939] .dialogSave .el-dialog__body .el-select .el-input__inner{
//   width: 100%!important;
// }
// /deep/ #buds .el-form-item__content .el-input .el-input__inner{
//   margin: 0 10px 8px 0;
// }
// /deep/ .formItem[data-v-4164c939]{
//   width: 95%;
// }
/deep/ .el-button:hover {
  background-color: #02a4ff;
  color: #fff;
}
/deep/ .el-input.is-disabled .el-input__inner {
  width: 75% !important;
}
/deep/ .el-input__inner {
  font-size: 12px !important;
  height: 35px !important;
}
.customLabelTitle {
  background: #E6E9F2;
  font-weight: bold;
  font-size: 14px;
  width: 225px;
  padding: 10px;
  box-sizing: border-box;
  margin: auto;
}
.customLabelList {
  width: 225px;
  height: 100%;
  text-align: center;
}
/deep/ .el-dialog__body {
  padding: 0 !important;
}
.bq {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 12px;
}
// .rubbishImg{
//   width: 15px;
//   height: 15px;
// }
.rubbish {
  width: 15px;
  height: 15px;
  background: url("../../assets/indexImg/删除.png");
  position: absolute;
  right: 10px;
  background-size: 100% 100%;
}
.group_add {
  margin-top: 25px;
  margin-left: 20px;
}
/deep/ .group_add .el-form{
  margin-right: 15px;
  overflow-y:auto;
  overflow-x:auto;
  width:600px;
  height:170px;
}
/deep/ .group_add .el-form .el-input__inner{
  width: 95%;
}
.spaceBetween {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.add_logo {
  width: 16px;
  height: 16px;
}
.add_logoY {
  width: 16px;
  height: 16px;
}
.fourNew{
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.fourNew /deep/ .el-select{
  width: 125px;
  margin-right: 10px;
}
.newTemplate{
  margin-right: 25px;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
.operationList {
  display: flex;
  align-items: center;
}
.alignCenter{
  display: flex;
  align-items: center;
}
.add_group{
  font-size: 14px;
  font-weight: normal!important;
}
.Tname{
  width: 70px;
  top: 0px;
  font-size: 14px;
  font-weight: normal!important;
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.addNewPatch {
  position: absolute;
  bottom: 0px;
  width: 25%;
  background: #02a4ff;
  height: 40px;
  display: flex;
  color: white;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  cursor: pointer;
}
.hx {
  width: 95%;
  height: 1px;
  background: black;
  margin: 10px 0 10px 0;
}
.group_close {
  font-size: 20px;
  // margin-left: 10px;
  font-weight: normal;
}
.customLabelContent {
  width: 93%;
  padding: 20px 0 0 20px;
}
.customLabelTop{
  margin-left: 30px;
}
.customLabelContent .dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 15px;
  right: 222px;
}
.customLabelContent .customLabelTop .el-input {
  margin-right: 50px;
}
.customLabelContent .el-button {
  margin-left: 40px;
}
.Tbase {
  margin: 20px 0 10px 20px;
  position: relative;
}
.Tbase_bp {
  padding-left: 30px;
  display: flex;
}
.bp_add {
  position: absolute;
  top: 2px;
  left: 10px;
  width: 16px;
  height: 16px;
  background: url("../../assets/indexImg/添加.png");
}
.bp_CH {
  margin-right: 20px;
}
.bp_symbol {
  margin: auto 3px;
}
.customLabelDialog {
  display: flex;
  width: 100%;
}
.customLabelDialog_left {
  display: flex;
  width: 225px;
  height: 357px;
  background-color: #fafafa;
}
.customLabelDialog_right {
  display: flex;
  width: 675px;
  height: 100%;
}
.el-form-item {
  margin: 5px 0;
}
/deep/ .el-form-item__content {
  display: flex;
  align-items: center;
}
.formTop .el-form-item__label {
  height: 40px;
  display: flex;
  line-height: none !important;
  text-align: left;
  align-items: center;
  padding-left: 20px !important;
}
.formTop {
  max-height: 200px;
  overflow: auto;
}
#tree {
  overflow-y: scroll;
}
#treeTwo {
  overflow-y: scroll;
  background: white;
}
#deleteIcon {
  padding-right: 10px;
}
#deleteIconTwo {
  padding-right: 10px;
}
.treeOp {
  height: 200px;
}
.formItem {
  width: 95%;
}
.el-cascader[data-v-4164c939]{
  width: 95%;
}
// /deep/ #db_form .spanFlex .el-input__inner{
//   width: 95%;
// }
.fixedaaa {
  background: #e9e9e9;
}
.aaaa {
  width: 95%;
  margin: auto;
  background: white;
}
.spanFlex {
  display: flex;
}
// .formItem .SF-hx{
//   width: 20px!important;
//   height: 1px!important;
//   background-color: #000;
// }
#all {
  margin: 20px 15px;
  #top {
    border-radius: 5px;
    background: white;
    margin-bottom: 10px;
  }
  .top {
    border-radius: 5px;
    background: white;
    position: relative;
    .top_top{
      width: 107px;
      height: 39px;
      background-color: #e6e9f2;
      position: absolute;
      top: 77px;
      right: 22px;
      z-index: 999;
      line-height: 39px;
      font-size: 12px;
      font-weight: 700;
    }
    .head {
      width: 100%;
      padding: 5px 0px;
      border-radius: 5px;
      .topRow {
        padding: 0 20px 20px 20px;
        .flex {
          display: flex;
          align-items: center;
          margin: 5px 0;
          .label {
            width: 100px;
            font-size: 15px;
            color: #333;
            font-weight: 400;
          }
        }
      }
    }
    .page {
      background-color: #fff;
      height: 60px;
      margin-right: 40px;
      .el-pagination {
        float: right;
        margin-top: 20px;
        /deep/ button {
          text-align: center;
          span {
            padding: 6px;
            background-color: #fff;
            border: 1px solid #ccc;
            padding-top: 0px;
          }
        }
      }
      /deep/ .el-pagination .el-select .el-input .el-input__inner{
        height: 28px!important;
      }
      /deep/ .el-pagination__editor.el-input .el-input__inner {
        height: 28px !important;
      }
    }
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 3px solid #33aed3;
  color: #303133;
}
.el-cascader {
  width: 100%;
}
/deep/ .el-range-editor.el-input__inner {
  width: 100%;
  margin-top: 3px;
}
.flex {
  display: flex;
  font-size: 14px;
  font-weight: bold;
}

#headLogo {
  width: 14px;
  margin: 10px 20px;
}
.border {
  width: calc(100% - 20px);
  margin: auto;
  background: #d0d0d0;
  margin-bottom: 10px;
  height: 1px;
}
// position: relative;
// top:-25px;
.border1 {
  width: calc(100% - 20px);
  margin: auto;
  background: #d0d0d0;
  margin-bottom: 10px;
  height: 1px;
  position: relative;
  top: -5px;
}
.FFFF span{
  padding-top: 7px!important;
  font-size: 14px!important;
  color: #47bcea!important;
}
.flexBetween {
  display: flex;
  justify-content: space-between;
  height: 48px;
  align-items: center;
}
.flexBetween span {
  padding-top: 0px;
  // color: #000!important;
}
.more {
  font-size: 14px;
  padding-right: 30px;
  cursor: pointer;
  color: #333;
  display: flex;
  height: 48px;
  justify-content: space-between;
  align-items: center;
}
.result {
  width: 100px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
}
.result span {
  font-size: 14px;
}
.result_t {
  width: 115px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.result_t span {
  font-size: 14px;
}
.result_r {
  width: 102px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.result_r span {
  font-size: 14px;
}
.el-table .cell {
  font-size: 12px;
}
.load {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 55px;
  margin-left: 25px;
}
.load span {
  font-size: 14px;
}
// .echarts{
//   background-color: pink;
//   width: 96%;
//   height: 100px;
//   margin: auto;
// }
.salesperson {
  height: 48px;
  text-align: center;
  .info {
    cursor: pointer;
    position: absolute;
    color: #33aed3;
    //  top:50%;
    //  left:50%;
    //  transform:translate(-50%,-50%);
    position: relative;
    top: -40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    p {
      margin-left: -30px;
    }
    p:hover {
      color: #445678;
    }
    span {
      font-size: 22px;
    }
    span:hover {
      color: #445678;
    }
  }
}
/* /deep/ .el-table__header-wrapper {
        background-color: #E6E9F2;
      } */
.fixed {
  position: fixed;
  z-index: 999999;
  top: 0;
  width: 300px;
  height: 500px;
  top: 50px;
  background: #e9e9e9;
  transition: all 0.5s;
}
.asd {
  height: 10px;
  background: #e9e9e9;
}
.fixedResult {
  position: fixed;
  top: 0;
  width: 300px;
  top: 50px;
  transition: all 0.5s;
  z-index: 999999;
}
.fixedTree {
  background: white;
  opacity: 1;
  min-height: 300px;
}
.fixedHead {
  margin: 10px 0 30px 10px;
  display: flex;
  justify-content: space-between;
}
.btnList .el-button {
  display: flex;
}
.el-button {
  background-color: #02a4ff;
  width: 90px;
  height: 30px;
  line-height: 6px;
  color: #fff;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  // margin: 0 0 0 440px;
  img {
    margin-right: 10px;
    vertical-align: text-bottom;
  }
}
.btnList {
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: center;
}
.group {
  display: flex;
  justify-content: space-between;
  height: 54px;
  .el-tabs {
    padding: 10px 1%;
    span {
      font-size: 14px;
      img {
        vertical-align: text-bottom;
        padding-right: 6px;
      }
    }
  }
}
.el-tabs__nav-wrap {
  padding-top: 5px;
}
/deep/ .el-tabs__item {
  color: #aaa;
}
/deep/ .el-tabs__item:hover {
  color: #33aed3;
}
/deep/ .el-tabs__item.is-active {
  color: #33aed3;
}
/deep/ .el-tabs__active-bar {
  background-color: #33aed3;
}
// /deep/.el-tabs__nav {
//   padding-bottom:5px;
// }
/deep/ .dialogAdd .el-dialog {
  height: 401px;
}
/deep/ .dialogAdd .el-dialog__header {
  background: #f2f2f2 !important;
  padding-bottom: 10px;
  padding-top: 10px;
}
/deep/ .dialogAdd .el-dialog__body {
  padding: 10px 20px;
}
/deep/ .customLabelMessage {
  width: 27px;
  height: 26px;
  background: url("../../assets/indexImg/资源 98.png");
  position: absolute;
  top: 10px;
  left: 10px;
}
/deep/ .el-dialog__header .el-dialog__title {
  font-weight: 700 !important;
  color: #38afd3 !important;
  padding-left: 30px;
  font-size: 14px!important;
}
/deep/ .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -15px;
  font-size: 28px;
}
.customLabelTitle[data-v-4164c939] {
  font-size: 14px;
}
/deep/ .dialogSave .el-dialog {
  height: 406px;
}
/deep/ .dialogSave .el-dialog__header {
  padding-top: 10px !important;
  background-color: #f2f2f2;
}
.dialogSave .submitMessage {
  width: 27px;
  height: 26px;
  background: url("../../assets/indexImg/资源 98.png");
  position: absolute;
  top: 10px;
  left: 10px;
}
/deep/ .dialogSave .el-dialog__body {
  padding: 5px 30px 0 10px !important;
}
/deep/ .dialogSave .el-dialog__body .el-textarea__inner {
  background-color: #f6f7fc;
  min-height: 136px !important;
  height: 100px;
}
/deep/ .dialogSave .el-dialog__body .el-select .el-input__inner {
  width: 529px;
}
/deep/ .dialogSave .el-dialog__footer {
  text-align: center;
  margin-left: 60px;
  margin-top: 30px;
}
/deep/ .dialogSave .el-dialog__footer .el-button {
  margin-right: 30px;
  padding: 1px 16px;
}
.el-form-item /deep/ .el-form-item__label {
  font-size: 16px;
}
/deep/ .dialogAqua .el-dialog {
  height: 406px;
}
/deep/ .dialogAqua .el-dialog__header {
  padding-top: 10px !important;
  background-color: #f2f2f2;
}
.dialogAqua .submitMessage {
  width: 27px;
  height: 26px;
  background: url("../../assets/indexImg/资源 98.png");
  position: absolute;
  top: 10px;
  left: 10px;
}
/deep/ .dialogAqua .el-dialog__body {
  padding: 0px 30px 0 10px !important;
  height: 290px;
}
/deep/ .dialogAquaa .el-dialog__body .el-form{
  overflow-y:auto;
  overflow-x:auto;
  // width:678px;
  height:240px;
}
.groupRight{
  display: flex;
  align-items: center;
}
.groupRight p{
  color: #000;
  margin-right: 10px;
}
.mr{
  margin-right: 30px;
}
.Aqua_addlogo {
  margin-right: 8px;
  margin-top: 2px;
  width: 16px;
  height: 16px;
  background: url("../../assets/indexImg/添加.png") no-repeat;
}
/deep/ .dialogAqua .el-dialog__footer {
  text-align: center;
  margin-left: 60px;
}
/deep/ .dialogAqua .el-dialog__footer .el-button[data-v-4164c939] {
  margin-right: 30px;
}
/deep/ .resultCard [data-v-4164c939] .el-input__inner{
  width: 248px;
}
.alignItemOne{
  display: flex;
  align-items: center;
}
.alignItemOne {
  img{
    padding-left: 10px;
    margin-right: 5px;
  }
}
.alignItemOne{
  span{
    cursor: pointer;
  }
}
.fzClass /deep/ .el-select>.el-input{
  width: 66px;
}
.fzClass /deep/ .el-select{
  // width: 60%;
  margin: 0 10px;
}
.blackSpan{
  width: 180px;
  padding-left: 10px;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.nameListBtn{
  margin: 0 5px;
}
.nameListForm{
  background: #F5F5F5;
}
.nameListHx{
  height: 1px;
  margin: auto;
  width: 98%;
  background: #F5F5F5;
}
.nameListTitle{
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.nameListTitle img{
  padding: 0 10px;
  width: 14px;
  height: 14px;
}
.nameListTitle p{
  font-size: 14px;
  color: #000;
}
/deep/.el-table th.is-leaf{
  background: #E6E9F2;
}
.nameListFind{
  position: relative;
  top: 2px;
  cursor: pointer;
}
.pageSet /deep/ .el-input__inner {
  font-size: 12px !important;
  height: 28px !important;
}
/deep/ .el-pagination{
  display: flex;
  justify-content: flex-end;
  margin: 10px 30px;
}
.deleteNameList{
  float: right;
  margin-right: 30px;
  margin-top: 15px;
  cursor: pointer;
}
.deleteNameList img{
  position: relative;
  left: 72px;
}
.deleteAll{
  padding-right: 20px;
  color: #000;
}
/deep/ .nameList .el-dialog {
  height: 726px;
}
.nameListTop{
  width: 900px;
  height: 60px;
  background-color: #f5f5f5;
  padding-top: 10px;
}
/deep/ .el-tabs__header{
  margin: 0;
}
/deep/ .nameList .el-dialog__body{
  padding: 0!important;
}
/deep/ .nameList .el-input{
  margin-right: 10px;
}
.HX{
  background-color: #dedede;
  width: 1px;
  height: 50px;
  margin-left: 20px;
}
/deep/ .nameList .el-col-13{
  display: flex;
}
.nameListBody{
  width: 900px;
  height: 60px;
  // display: flex;
}
/deep/ .nameListBody .el-col-9{
  display: flex;
  align-items: center;
}
/deep/ .nameListBody .el-col-17{
  margin-top: 4px;
}
/deep/ .nameListBody .el-form-item__content{
  line-height: 22px;
}
.nameListTabel{
  padding: 0 30px 0 10px;
}
.delItem{
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
// /deep/ .nameList .el-tabs__nav{
// }
/deep/ .nameList .el-tabs__nav-scroll{
  padding: 0 20px;
}
// /deep/ .nameList .el-tabs__active-bar{
  // width: 115px!important;
// }
/deep/ .nameList .el-tabs--top .el-tabs__item.is-top:nth-child(2){
  padding: 0px!important;
  color: #000;
  width: 115px;
  text-align: center;
}
/deep/ .nameList .el-tabs--top .el-tabs__item.is-top:last-child{
  padding: 0px!important;
  color: #000;
  width: 115px;
  text-align: center;
}
.nameListBtm{
  width: 900px;
  height: 60px;
  background-color: #f5f5f5;
  padding-top: 10px;
}
/deep/ .nameList .el-tabs__item.is-active{
  color: #000;
  font-weight: 700;
}
/deep/ .dialogEnter .el-dialog {
  height: 200px;
}
/deep/ .dialogEnter .el-dialog__header {
  padding-top: 10px !important;
  background-color: #f2f2f2;
}
.dialogEnter .submitMessage {
  width: 27px;
  height: 26px;
  background: url("../../assets/indexImg/资源 98.png");
  position: absolute;
  top: 10px;
  left: 10px;
}
/deep/ .dialogEnter .el-dialog__body{
  padding-right: 30px!important;
}
/deep/ .dialogEnter .el-dialog__footer {
    padding: 10px 20px 20px;
    text-align: center;
    box-sizing: border-box;
    margin-top: 40px;
}
.el-icon-close{
  cursor: pointer;
}
.bqs{
  overflow-y: auto;
  height: 77%;
}
</style>
