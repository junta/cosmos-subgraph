# CosmosHub Transfers Example

## Generating a manifest

The subgraph is compatible with multiple Cosmos networks so before building the subgraph you need to generate a manifest file for the network of your choice. In case of the Cosmos Hub network, run the following command:

```shell
$ yarn prepare:cosmoshub
```

For the list of supported networks, see the scripts in the [`package.json`](package.json) file.

## Querying the subgraph

```
{
  transfers(where: {uatomAmount_gt: 100000000}, first:5) {
    id
    uatomAmount
    recipient
    sender
  }
}
```
