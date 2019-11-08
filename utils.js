const getFullYearMonth = (data)=>{
    let year = new Date(data).getFullYear()
    let month=new Date(data).getMonth()
    let day=new Date(data).getDate()
    return {year,month,day}
} 

const getCurrentDay=(year,month,day)=>{
  return new Date(year,month,day)
} 
export{
  getFullYearMonth,
  getCurrentDay
}