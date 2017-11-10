    // 全局过滤器
    Vue.filter("money", function(value, type) {
        return "￥" + value.toFixed(2) + type;
    })

    new Vue({
        el: "#app",
        data: {
            totalMoney: 0,
            productList: [],
            checkAllFlag: false,
            delFlag: false,
            curProduct: '',
        },
        // 局部过滤器
        filters: {
            formatMoney: function(value) {
                return "￥" + value.toFixed(2);
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.cartView();
            })

        },
        methods: {
            cartView() {
                //es5
                // var _this = this;
                // this.$http.get("data/cartData.json", { "id": 123 }).then(function(res) {
                //     console.log(res);
                //     _this.productList = res.data.result.list;
                //     _this.totalMoney = res.data.result.totalMoney;
                // })

                //es6

                this.$http.get("data/cartData.json", { "id": 123 }).then(res => {
                    this.productList = res.data.result.list;
                    // this.totalMoney = res.data.result.totalMoney;
                })
            },
            // + - 改变商品数量

            changeMoney(product, way) {
                if (way > 0) {
                    product.productQuantity++;

                } else {
                    product.productQuantity--;
                    if (product.productQuantity <= 1) {
                        product.productQuantity = 1;
                    }
                }
                this.calcTotalPrice();
            },
            // 单选
            selectedProduct(item) {
                // 判断item.checked属性是否存在
                if (typeof item.checked == 'undefined') {
                    // 全局注册变量
                    Vue.set(item, 'checked', true);
                    // 局部注册变量
                    // this.$set(item,"checked",true);
                } else {
                    item.checked = !item.checked;
                }
                this.calcTotalPrice();


            },
            // 全选
            checkAll(flag) {
                this.checkAllFlag = flag;

                this.productList.forEach((item, index) => {

                    if (typeof item.checked == 'undefined') {
                        // 局部注册变量
                        this.$set(item, "checked", this.checkAllFlag);
                    } else {
                        item.checked = this.checkAllFlag;
                    }
                })
                this.calcTotalPrice();

            },
            // 计算总金额
            calcTotalPrice: function() {
                var _this = this;
                _this.totalMoney = 0;
                // 循环数字
                this.productList.forEach(function(item, index) {
                    if (item.checked) {
                        // console.log(_this.totalMoney)
                        _this.totalMoney += item.productPrice * item.productQuantity;
                    }
                })
            },
            // 点击删除按钮，弹出删除确认框，传入点击的数据的item

            delConfirm: function(item) {
                this.delFlag = true;
                this.curProduct = item;
            },
            // 确认删除
            delProduct: function(params) {
                // 通过传入的
                var index = this.productList.indexOf(this.curProduct);
                this.productList.splice(index, 1);
                this.delFlag = false;

            },



        }
    })