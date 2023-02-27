import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Transaction as TransactionType } from '@/types/transaction';

export const useSolTransfer = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  return async ({ address, amount }: { address: string; amount: string }) => {
    if (!publicKey) throw new WalletNotConnectedError();

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(address),
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
      }),
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, { minContextSlot });

    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });

    const transactionDocument: TransactionType = {
      signature,
      block: confirmation.context.slot.toString(),
      sender: publicKey.toBase58(),
      recipient: address,
      amount,
      previousBlockHash: blockhash,
    };

    return transactionDocument;
  };
};
