import { ethers } from "ethers";
import { addresses, abis } from "../sablier";

const provider = ethers.getDefaultProvider("rinkeby");
const contract = new ethers.Contract(addresses[4].sablier, abis.sablier, provider);

export { contract, provider };
