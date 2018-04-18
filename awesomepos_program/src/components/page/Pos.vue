<template>
  <div class="pos">
    <div>
      <el-row >
        <el-col :span='7' class="pos-order" :style="pageHeight">
          <el-tabs class="table-header-style">
            <el-tab-pane label='点餐'>
              <el-table border style="width:100%;" :data='orderListData'>
                <el-table-column prop='goodsName' label='商品名称'></el-table-column>
                <el-table-column prop='count' label='数量' width='50'></el-table-column>
                <el-table-column prop='price' label='金额' width='70'></el-table-column>
                <el-table-column label='操作' width='100' fixed='right'>
                  <template slot-scope="scope">
                    <el-button type='text' size='small' @click='delSingleGoods(scope.row)'>删除</el-button>
                    <el-button type='text' size='mini' @click="addOrderList(scope.row)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="total-count-price">
                数量:&nbsp;<span>{{totalCount}}</span> &nbsp;&nbsp;&nbsp;&nbsp;总金额:&nbsp;<span>&yen;{{totalMoney}}</span>
              </div>
              <div class="order-operation-btn">
                <el-button type="warning" >挂单</el-button>
                <el-button type="danger" @click="delAllGoods">删除</el-button>
                <el-button type="success" >结账</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label='挂单'>

            </el-tab-pane>
            <el-tab-pane label='外卖'>

            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--商品展示-->
        <el-col :span="17">
          <!-- 常用商品 -->
          <div class="often-goods clear">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="item in oftenGoods" :key='item.goodsId' @click='addOrderList(item)'>
                  <span>{{item.goodsName}}</span>
                  <span class="o-price">&yen;{{item.price}}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 全部商品分类 -->

          <div class="goods-type">
              <el-tabs class="table-header-style">
                  <el-tab-pane label="汉堡">
                    <ul class='cook-list'>
                        <li v-for='item in type0Goods' :key='item.id' @click="addOrderList(item)">
                            <span class="food-img"><img :src="item.goodsImg"></span>
                            <span class="food-name">{{item.goodsName}}</span>
                            <span class="food-price">&yen;{{item.price}}元</span>
                        </li>
                    </ul>
                  </el-tab-pane>
                      <el-tab-pane label="小食">
                      <ul class='cook-list'>
                        <li v-for='item in type1Goods' :key='item.id' @click="addOrderList(item)">
                            <span class="food-img"><img :src="item.goodsImg"></span>
                            <span class="food-name">{{item.goodsName}}</span>
                            <span class="food-price">&yen;{{item.price}}元</span>
                        </li>
                    </ul>
                  </el-tab-pane>
                  <el-tab-pane label="饮料">
                     <ul class='cook-list'>
                        <li v-for='item in type2Goods' :key='item.id' @click="addOrderList(item)">
                            <span class="food-img"><img :src="item.goodsImg"></span>
                            <span class="food-name">{{item.goodsName}}</span>
                            <span class="food-price">&yen;{{item.price}}元</span>
                        </li>
                    </ul>
                  </el-tab-pane>
                  <el-tab-pane label="套餐">
                     <ul class='cook-list'>
                        <li v-for='item in type3Goods' :key='item.id' @click="addOrderList(item)">
                            <span class="food-img"><img :src="item.goodsImg"></span>
                            <span class="food-name">{{item.goodsName}}</span>
                            <span class="food-price">&yen;{{item.price}}元</span>
                        </li>
                    </ul>
                  </el-tab-pane>
          
              </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Pos",
  data() {
    return {
      pageHeight: "",
      orderListData: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      oftenGoods: [],
      totalCount: 0,
      totalMoney: 0
    };
  },
  mounted: function() {
    //需要将html,body设置成100%,不然无效
    var orderHeight = document.body.clientHeight;
    this.pageHeight = "height:" + orderHeight + "px";
    this.getOftenFoods();
    this.getTypeGoods();
  },
  methods: {
    getOftenFoods() {
      axios
        .get("http://jspang.com/DemoApi/oftenGoods.php")
        .then(response => {
          if (response.status == "200") {
            this.oftenGoods = response.data;
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络错误，稍后再试！");
        });
    },
    getTypeGoods() {
      axios
        .get("http://jspang.com/DemoApi/typeGoods.php")
        .then(response => {
          if (response.status == "200") {
            this.type0Goods = response.data[0];
            this.type1Goods = response.data[1];
            this.type2Goods = response.data[2];
            this.type3Goods = response.data[3];
          }
        })
        .catch(error => {
          console.log(error);
          alert("网络错误，稍后再试！");
        });
    },
    addOrderList(goods) {
      let isHaveGoods = false;
      for (let i = 0; i < this.orderListData.length; i++) {
        if (this.orderListData[i].goodsId == goods.goodsId) {
          isHaveGoods = true;
        }
      }
      if (isHaveGoods) {
        //存在就进行数量添加
        let arr = this.orderListData.filter(o => o.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        //不存在就推入数组
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.orderListData.push(newGoods);
      }

      //进行数量和价格的汇总计算
      this.getAllMoney();
    },
    // 删除单个商品
    delSingleGoods: function(goods) {
      this.orderListData = this.orderListData.filter(
        item => item.goodsId != goods.goodsId
      );
      this.getAllMoney();
    },
    //删除所有商品
    delAllGoods() {
      this.orderListData = [];
      this.totalCount = 0;
      this.totalMoney = 0;
    },
    //汇总数量和金额
    getAllMoney() {
      this.totalCount = 0;
      this.totalMoney = 0;
      if (this.orderListData) {
        this.orderListData.forEach(element => {
          this.totalCount += element.count;
          this.totalMoney = this.totalMoney + element.price * element.count;
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-header-style {
  padding-left: 10px;
}
/* 中间 */
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
.order-operation-btn {
  margin-top: 20px;
  text-align: center;
}
/* 右侧商品展示 */
/* 常用商品 */
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #5ee9f2;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  cursor: pointer;
}
.o-price {
  color: #58b7ff;
}

/* 所有商品分类 */
.cook-list li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cook-list li span {
  display: block;
  float: left;
  box-sizing: border-box;
}
.food-img {
  width: 40%;
}
.food-img img {
  display: block;
  width: 100%;
  height: 100%;
}
.food-name {
  font-size: 16px;
  padding-left: 10px;
  width: 60%;
  color: brown;
}
.food-price {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
  width: 60%;
}
.total-count-price {
  text-align: center;
  border: 1px solid #ebeef5;
  color: #909399;
  height: 40px;
  line-height: 40px;
}
.total-count-price span {
  font-size: 16px;
  color: brown;
}
</style>
