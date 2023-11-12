export const convertdate=(startdate,planperiod)=>{
    let StartDate=''
    let EndDate=''
    switch(planperiod){
        case '3 months':
             const newstartdate1=String(new Date(startdate).toLocaleDateString()).split('/')
             const newdate1=new Date(newstartdate1[2],newstartdate1[0]-1,newstartdate1[1])
            const startdate1=new Date(newdate1)
            const enddate1=new Date(newdate1)
            enddate1.setDate(enddate1.getDate()+90)
            StartDate=`${startdate1.getMonth()+1}/${startdate1.getDate()}/${startdate1.getFullYear()}`,
            EndDate=`${enddate1.getMonth()+1}/${enddate1.getDate()}/${enddate1.getFullYear()}`
            break;
           
        case '6 months':
            const newstartdate2=String(new Date(startdate).toLocaleDateString()).split('/')
            const newdate2=new Date(newstartdate2[2],newstartdate2[0]-1,newstartdate2[1])
           const startdate2=new Date(newdate2)
           const enddate2=new Date(newdate2)
           enddate2.setDate(enddate2.getDate()+180)
           StartDate=`${startdate2.getMonth()+1}/${startdate2.getDate()}/${startdate2.getFullYear()}`,
           EndDate=`${enddate2.getMonth()+1}/${enddate2.getDate()}/${enddate2.getFullYear()}`
            break;
        case '9 months':
            const newstartdate3=String(new Date(startdate).toLocaleDateString()).split('/')
            const newdate3=new Date(newstartdate3[2],newstartdate3[0]-1,newstartdate3[1])
           const startdate3=new Date(newdate3)
           const enddate3=new Date(newdate3)
           enddate3.setDate(enddate3.getDate()+270)
           StartDate=`${startdate3.getMonth()+1}/${startdate3.getDate()}/${startdate3.getFullYear()}`,
           EndDate=`${enddate3.getMonth()+1}/${enddate3.getDate()}/${enddate3.getFullYear()}`
            break;
        case '12 months':
            const newstartdate4=String(new Date(startdate).toLocaleDateString()).split('/')
            const newdate4=new Date(newstartdate4[2],newstartdate4[0]-1,newstartdate4[1])
           const startdate4=new Date(newdate4)
           const enddate4=new Date(newdate4)
           enddate4.setDate(enddate4.getDate()+270)
           StartDate=`${startdate4.getMonth()+1}/${startdate4.getDate()}/${startdate4.getFullYear()}`,
           EndDate=`${enddate4.getMonth()+1}/${enddate4.getDate()}/${enddate4.getFullYear()}`
            break;
        default:
            StartDate=StartDate
            EndDate=EndDate;
            break;
        }
        return {StartDate:StartDate,EndDate:EndDate}
}