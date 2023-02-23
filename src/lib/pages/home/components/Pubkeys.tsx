import { Grid } from "@chakra-ui/react";
import { KeepKeySdk } from "@keepkey/keepkey-sdk";
import React, { useEffect } from "react";

const Pubkeys = () => {
  const [pubkeys, setPubkeys] = React.useState("");
  const [url, setURL] = React.useState("");

  const onStart = async function () {
    try {
      const apiKey = localStorage.getItem("apiKey") || "1234";
      const config = {
        apiKey,
        pairingInfo: {
          name: "onramper-dapp",
          imageUrl:
              "https://image.pitchbook.com/jCSqZpD1au0fiH5lByEa93GWnhz1627378102738_200x200",
          url: "https://onramper-dapp.vercel.app/",
        },
      };
      // init
      const sdk = await KeepKeySdk.create(config);
      if (config.apiKey !== apiKey)
        localStorage.setItem("apiKey", config.apiKey);

      // eslint-disable-next-line no-console
      console.log("apiKey: ", config.apiKey);

      // get ETH address
      // Unsigned TX
      const addressInfoEth = {
        addressNList: [2147483692, 2147483708, 2147483648, 0, 0],
        coin: "Ethereum",
        scriptType: "ethereum",
        showDisplay: false,
      };

      // push tx to api
      // console.log(kk.instance.SignTransaction())
      const responseEth = await sdk.address.ethereumGetAddress({
        address_n: addressInfoEth.addressNList,
      });
      // eslint-disable-next-line no-console
      console.log("responseEth: ", responseEth);

      // get BTC address
      // Unsigned TX
      const addressInfo = {
        addressNList: [2147483732, 2147483648, 2147483648, 0, 0],
        coin: "Bitcoin",
        scriptType: "p2wpkh",
        showDisplay: false,
      };

      const responseBtc = await sdk.address.utxoGetAddress({
        address_n: addressInfo.addressNList,
        script_type: addressInfo.scriptType,
        coin: addressInfo.coin,
      });
      // eslint-disable-next-line no-console
      console.log("responseBtc: ", responseBtc);

      // get LTC address

      // get OSMO address
      const pubkeysNew =
          `ETH:${responseEth.address},` + `BTC:${responseBtc.address}`;
      const urlOnramper = `https://demo.tennisfinance.com/?apiKey=TEST_KEY_HERE&wallets=${pubkeysNew}`;
      // eslint-disable-next-line no-console
      console.log("urlOnramper: ", urlOnramper);
      setURL(urlOnramper);
      // get COSMO address
      setPubkeys(pubkeysNew);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  // onstart get data
  useEffect(() => {
    onStart();
  }, []);

  return (
      <Grid textAlign="center" gap={2}>
        <iframe
            src={url}
            height="540px"
            width="360px"
            title="Onramper widget"
            allow="accelerometer; autoplay; camera; gyroscope; payment"
        />
      </Grid>
  );
};

export default Pubkeys;
