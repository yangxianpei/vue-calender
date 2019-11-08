<template>
    <div v-isshow>
        <input type="text" :value="formatDate">
        <div class="pannel" v-if="isVisiable">
            <div class="nav">
                <span @click="preyear">&lt;</span>
                <span @click="premonth">&lt;&lt;</span>
                <span>{{time.year}}年</span>
                <span>{{time.month+1}}月</span>
                <span @click="nextmonth">&gt;&gt;</span>
                <span @click="nextyear">&gt;</span>
            </div>
            <div class="content">
                <div>
                  <span v-for="i in weekInfo" :key="i" class="cell">
                      {{i}}
                  </span>
                </div>
                <div v-for="i in 6" :key="i">
                    <span v-for="j in 7" :key="j" 
                    class='cell'
                    :class="[
                    {isCurrentMonth:!isCurrentMonth(getFormatDate[(i-1)*7+(j-1)])},
                    {isTadya:isTady(getFormatDate[(i-1)*7+(j-1)])}
                    ]"
                    @click="changeDay(getFormatDate[(i-1)*7+(j-1)])"
                    >
                          {{getFormatDate[(i-1)*7+(j-1)].getDate()}}
                    </span>
                </div>
            </div>
            <div class="footer">
              
            </div>
        </div>
    </div>
</template>
<script>
import * as utils from './utils'
export default {
    data(){
      let {year,month}=utils.getFullYearMonth(this.value)
      return{
          isVisiable:true,
          weekInfo:['日','一','二','三','四','五','六'],
          time:{year,month}
      }
    },
    props:{
      value:{
          type:Date,
          default:()=>new Date()
      }
    },
    mounted(){
    },
    computed:{
        formatDate(){
          let {year,month,day}=utils.getFullYearMonth(this.value)
          return `${year}-${month+1}-${day}`
        },
        getFormatDate(){
          let {year,month}=utils.getFullYearMonth(utils.getCurrentDay(this.time.year,this.time.month,1))//获得用户传的时间
          let currentMonthFirstDay=utils.getCurrentDay(year,month,1)//获得用户传的时间的1号
          let week=currentMonthFirstDay.getDay()//获得 1号是周几
          let startDay=currentMonthFirstDay-week*60*60*24*1000
          let arr=[]
              
          for(let i =0 ;i<42;i++){
              arr.push(new Date(startDay+i*60*60*24*1000))
          }
          return arr
        }
    },
    methods:{
        show(){
            this.isVisiable=true
        },
        hide(){
          this.isVisiable=false
        },
        isCurrentMonth(data){
            let {year,month}=utils.getFullYearMonth(this.value)
            let {year:y,month:m}=utils.getFullYearMonth(data)
            return year==y && month==m
        },
        isTady(data){
            // console.log(data);
             let {year,month,day}=utils.getFullYearMonth(new Date())
            let {year:y,month:m,day:d}=utils.getFullYearMonth(data)
            return year==y && month==m && day==d
        },
        changeDay(data){
            this.$emit('input',data)
            this.hide()
        },
        premonth(){
            let d= utils.getCurrentDay(this.time.year,this.time.month,1)
            d.setMonth(d.getMonth()-1)
            this.time=utils.getFullYearMonth(d)
        },
        nextmonth(){
              let d= utils.getCurrentDay(this.time.year,this.time.month,1)
            d.setMonth(d.getMonth()+1)
               this.time=utils.getFullYearMonth(d)
        },
      preyear(){
          let d= utils.getCurrentDay(this.time.year,this.time.month,1)
            d.setFullYear(d.getFullYear()-1)
            this.time=utils.getFullYearMonth(d)
      },
      nextyear(){
          let d= utils.getCurrentDay(this.time.year,this.time.month,1)
            d.setFullYear(d.getFullYear()+1)
            this.time=utils.getFullYearMonth(d)
      }
    },
    directives:{
      isshow:{
        bind(el,bindings,vnode){ //vnode 里面的content 我们需要
            let handler =function(e){
                // console.log(e);
                // console.log(e.currentTarget);
                //e.currentTarget 返回当前绑定事件元素，e.target 返回当前点击元素
                // node.contains dom原生方法
                // console.log(e.target);
                if(el.contains(e.target)){
                  if(!vnode.context.isVisiable){
                      vnode.context.show()  
                  } 
                             
                }else{
                  if(vnode.context.isVisiable){
                        vnode.context.hide()
                  }
              
                }
            }
            el.handler=handler
            document.addEventListener('click',handler)
        },
        unbind(el){
            document.removeEventListener('click', el.handler)
        }
      }
    }
}
</script>
<style lang="stylus">
.pannel{
  width 300px
  position absolute;
  width  32*7px
  box-shadow 2px 2px 2px pink,-2px -2px 2px pink;
  .nav{
    height 40px
    display flex
    justify-content space-between
  }
  .content{
    .cell{
      display inline-flex
      justify-content space-around
      align-items center
      width 32px
      height 32px
      font-weight bold
      box-sizing border-box
    }
    .cell:hover{
      border:1px solid pink
    }
  }
}
.footer{
  height 30px
}
.isCurrentMonth{
  color gray
}
.isTadya{
  background red;
  border-radius 4px;
}
</style>
