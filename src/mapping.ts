import { cosmos, BigInt } from "@graphprotocol/graph-ts";
import { Send, Block } from "../generated/schema";
import { cosmos as cosmoshub } from "@graphprotocol/cosmoshub-ts";

export function handleTx(data: cosmos.TransactionData): void {
  const id = `${data.block.header.hash.toHexString()}-${data.tx.index}`;
  const messages = data.tx.tx.body.messages;

  const block = new Block(id);
  block.number = BigInt.fromString(data.block.header.height.toString());
  block.timestamp = BigInt.fromString(
    data.block.header.time.seconds.toString()
  );
  block.save();

  for (let i = 0; i < messages.length; i++) {
    let msgType = messages[i].typeUrl;
    let msgValue = messages[i].value as Uint8Array;

    if (msgType == "/cosmos.bank.v1beta1.MsgSend") {
      const message = cosmoshub.bank.v1beta1.decodeMsgSend(msgValue);
      const msg = new Send(id);
      msg.fromAddress = message.from_address;
      msg.toAddress = message.to_address;
      msg.amount = BigInt.fromString(message.amount[0].amount);
      msg.hash = data.tx.hash;
      msg.block = block.id;
      msg.save();
    }
  }
}
