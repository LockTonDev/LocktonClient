import{aF as e}from"./index.469b2f08.js";const s={async setApplyInsurance(t){return await e.authService.post("/ADM/TAX/APPLY/set",{params:t})},async getApplyInsurance(t){return await e.authService.post("/ADM/TAX/APPLY/get",{params:t})},async setUserRegNo(t){return await e.authService.post("/ADM/USER_REG_NO/set",{params:t})},async getUserRegList(t){return await e.authService.post("/ADM/USER_REG_NO/gets",{params:t})},async getBoardInfo(t){return await e.authService.post("/ADM/BOARD/get",{params:t})},async getBoardList(t){return await e.authService.post("/ADM/BOARD/gets",{params:t})},async setInsertBoard(t){return await e.authService.post("/ADM/BOARD/ins",{params:t})},async setUpdateBoard(t){return await e.authService.post("/ADM/BOARD/udt",{params:t})},async setDeleteBoard(t){return await e.authService.post("/ADM/BOARD/del",{params:t})},async setBoardInfo(t){return await e.authService.post("/ADM/BOARD/set",{params:t})},async setUserLoginBlockReset(t){return await e.authService.post("/ADM/USER/setUserLoginBlockReset",{params:t})},async getUserInfo(t){return await e.authService.post("/ADM/USER/get",{params:t})},async getUserList(t){return await e.authService.post("/ADM/USER/gets",{params:t})},async setUserInfo(t){return await e.authService.post("/ADM/USER/set",{params:t})},async setUsersTemp(t){return await e.authService.post("/ADM/COM/setUsersTemp",{params:t})},async getTAXRate(t){return await e.authService.post("/ADM/TAX/rate",{params:t})},async setTAX(t){return await e.authService.post("/ADM/TAX/set",{params:t})},async setACCSUser(t){return await e.authService.post("/ADM/ACC/renewal/sets",{params:t})},async getTAX(t){return await e.authService.post("/ADM/TAX/get",{params:t})},async getTAXS(t){return await e.authService.post("/ADM/TAX/gets",{params:t})},async getTAXExcel(t){return await e.authService.post("/ADM/TAX/EXCEL/get",{params:t})},async setTAX_TRX(t){return await e.authService.post("/ADM/TAX/TRX/set",{params:t})},async getTAX_TRX(t){return await e.authService.post("/ADM/TAX/TRX/get",{params:t})},async setTAXRenewal(t){return await e.authService.post("/ADM/TAX/RENEWAL/set",{params:t})},async getRenewal(t){return await e.authService.post("/ADM/TAX/RENEWAL/get",{params:t})},async getRenewals(t){return await e.authService.post("/ADM/TAX/RENEWAL/gets",{params:t})}};export{s as a};
