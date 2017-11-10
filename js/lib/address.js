new Vue({
    el: '.container',
    data: {
        addressList: [],
        limitNum: 3,
        upDown: true,
        currentIndex: 0,
        shippingMethod: 1,

    },
    mounted: function() {
        // 初始化
        this.$nextTick(function() {
            this.getAddressList();
        });
    },
    computed: {
        filterAddress: function() {
            // console.log(this.limitNum);
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        //请求数据函数
        getAddressList: function() {
            var _this = this;
            this.$http.get("data/address.json").then(function(response) {
                var res = response.data;
                //成功返回0
                if (res.status == "0") {
                    _this.addressList = res.result;
                }
            })
        },
        loadMore: function() {
            //console.log(this.upDown)
            if (this.upDown == true) {
                this.limitNum = this.addressList.length;
                this.upDown = false;
            } else {
                this.limitNum = 3;
                this.upDown = true;
            }


        },
        // 设置默认地址
        setDefault(addressId) {
            // 循环遍历数组
            this.addressList.forEach(function(address, index) {
                //判断传入的id是否等于当前的id
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }

            })


        }

    }
});