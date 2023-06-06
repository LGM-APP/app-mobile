import Axios from "./api.service";

const addBet = (bet) => {
    const { matchID, betTeamID, amount } = bet;
    const url = `/bet/add?matchID=${matchID}&betTeamID=${betTeamID}&amount=${amount}`;
    console.log(bet);
    return Axios.post(url, null, { headers: { Authorization : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5YWNpbmV0YWxoYW91aTEzQGdtYWlsLmNvbSIsInJvbGUiOlsiVVNFUiJdLCJpYXQiOjE2ODYwNzg0MTcsImV4cCI6MTY4NjExNDQxN30.czXFuOcYMltJOp2o_0zweqz91ztCkGJG3LxvNLf0CYk" } });
  };
 
const getBet = (page) => {
	return Axios.get(`/bet/get/${page}`, { headers: { requiresAuth: true } });
};

export const bet_service = { addBet, getBet };
