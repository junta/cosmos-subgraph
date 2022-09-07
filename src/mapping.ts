import { cosmos, BigInt } from "@graphprotocol/graph-ts";
import { Transfer } from "../generated/schema";

export function handleTransfer(data: cosmos.EventData): void {
  const height = data.block.header.height;

  const amount = data.event.getAttributeValue("amount");
  const recipient = data.event.getAttributeValue("recipient");
  const sender = data.event.getAttributeValue("sender");

  let transfer = new Transfer(`${height}-${recipient}`);

  // remove uatom and convert to BigInt
  transfer.uatomAmount = BigInt.fromString(amount.slice(0, -5));
  transfer.recipient = recipient;
  transfer.sender = sender;

  transfer.save();
}
