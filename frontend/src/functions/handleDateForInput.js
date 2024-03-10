export const handleDateForInput=(date)=>{
  if(date && date.split("-").length === 3){
    return new Date(date).toISOString().split("T")[0]
  }
  return ""
}