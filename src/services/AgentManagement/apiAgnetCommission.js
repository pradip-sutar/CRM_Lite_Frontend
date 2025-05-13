
export const apiGetAgentCommission = async () => {
    try {
      const response = await apiGateWay.get(
        `/api/agent_commission_handler/`
      );
      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };