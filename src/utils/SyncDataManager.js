import { store } from "../App";
import { ProgressDialog } from "../components/common";
import { deleteDropDowns, insertDropDowns } from "../data/DatabaseHelper";
import apiCall from '../network/ApiService';

let index = 0
const offlineData = [
    {
        name: "Customer Types",
        status: 0,
        endPoint: "GetCustomerType"
    },
    {
        name: "Customer Categories",
        status: 0,
        endPoint: "GetCustomerCategory"
    },
    {
        name: "Customer Territories",
        status: 0,
        endPoint: "GetUserAssignTerritoriesByUserID"
    },
    {
        name: "Countries",
        status: 0,
        endPoint: "GetCountries"
    },
    {
        name: "Stage",
        status: 0,
        endPoint: "GetOpportunityStage"
    },
    {
        name: "OpportunityCurrency",
        status: 0,
        endPoint: "GetOpportunityCurrency"
    },
    {
        name: "OpportunityCategory",
        status: 0,
        endPoint: "GetOpportunityCategory"
    },
    {
        name: "TerritoryForAssignOpportunity",
        status: 0,
        endPoint: "GetTerritoryForAssignOpportunity"
    },
    {
        name: "OpportunitySalesStage",
        status: 0,
        endPoint: "GetOpportunitySalesStage"
    },
    {
        name: "OpportunityBillingType",
        status: 0,
        endPoint: "GetOpportunityBillingType"
    },
    // {
    //     name: "GetProductsForOpportunity",
    //     status: 0,
    //     endPoint: "GetProductsForOpportunity"
    // },
    // {
    //     name: "GetProductCategory",
    //     status: 0,
    //     endPoint: "GetProductCategory"
    // },
    // {
    //     name: "GetProductGroup",
    //     status: 0,
    //     endPoint: "GetProductGroup"
    // },
    // {
    //     name: "GetTaskName",
    //     status: 0,
    //     endPoint: "GetTaskName"
    // },
    // {
    //     name: "GetReminderAlert",
    //     status: 0,
    //     endPoint: "GetReminderAlert"
    // },
    // {
    //     name: "GetPriority",
    //     status: 0,
    //     endPoint: "GetPriority"
    // },
    // {
    //     name: "GetUserForAssignActivity",
    //     status: 0,
    //     endPoint: "GetUserForAssignActivity"
    // },
    // {
    //     name: "GetRelatedTo",
    //     status: 0,
    //     endPoint: "GetRelatedTo"
    // },
]

const syncData = () => {

    console.log("--------------------------------------------")
    console.log("index", index)

    if (index <= offlineData.length - 1) {

        offlineData[index].status = 1

        const endPoint = offlineData[index].endPoint
        apiCall(endPoint, {}, async (res) => {

            const { Table, Table1 } = res

            console.log("Table && typeof (Table) == Array", Table && typeof (Table))
            console.log("Table1 && typeof (Table1) == Array", Table1 && typeof (Table1))
            if (Table && Array.isArray(Table)) {
                await Promise.all(Table.map(async (t) => {
                    const { ID, Name, TerritoryName, CurrencyName, CountryName, TerritoryID } = t

                    // if (ID && Name) {
                    console.log("Going to insert1")

                    await insertDropDowns(ID || TerritoryID, Name || TerritoryName || CurrencyName || CountryName, endPoint)
                    // }
                }))
            } else if (Table1 && Array.isArray(Table1)) {
                await Promise.all(Table1.map(async (t) => {
                    const { ID, Name, TerritoryName, CurrencyName, CountryName, TerritoryID, } = t

                    // if (ID && Name) {
                    console.log("Going to insert1")

                    await insertDropDowns(ID || TerritoryID, Name || TerritoryName || CurrencyName || CountryName, endPoint)
                    // }
                }))
            }


            offlineData[index].status = 2
            index++
            if (index <= offlineData.length - 1)
                syncData()
            else {
                ProgressDialog.hide()
                index = 0
                store.dispatch(setSessionField("isSync", true))
                reset("Home")
            }

            console.log("--------------------------------------------")

        }, (error) => {
            index++
            if (index <= offlineData.length - 1)
                syncData()
            else {
                index = 0
                ProgressDialog.hide()
                store.dispatch(setSessionField("isSync", true))
                reset("Home")
            }
            console.log("--------------------------------------------")

            console.log("error", error)
            console.log("--------------------------------------------")

            // if (onError) {
            //     onError(error)
            // }
        })
    }

}

export const syncAllData = async () => {
    ProgressDialog.show()
    await deleteDropDowns()
    syncData()
}