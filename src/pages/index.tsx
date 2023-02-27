import { FC, useState, ReactNode, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useOverlayTriggerState } from 'react-stately';
import cn from 'classnames';
import { Button, Modal, NumberInput, SolScanLink, TextInput } from '@/components';
import { useSolTransfer } from '@/hooks';
import { addTransactionToDB } from '@/database/firebase';
import styles from '@/styles/Home.module.scss';

const Home: FC = () => {
  const dispatch = useDispatch();
  const modalState = useOverlayTriggerState({});
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('0.1');
  const [modalMessage, setModalMessage] = useState<ReactNode>(null);
  const transferSol = useSolTransfer();

  const openModal = useCallback(
    (message: ReactNode) => {
      setModalMessage(message);
      dispatch({ type: 'SET_LOADING', loading: false });
      modalState.open();
    },
    [dispatch, modalState],
  );

  return (
    <form className={styles.form}>
      <TextInput
        pattern="[a-zA-Z0-9]{32,44}"
        label="Recipient's address"
        placeholder="aBcDeF123..."
        value={address}
        onChange={setAddress}
      />
      <NumberInput
        label="Amount of SOL"
        placeholder="1"
        value={amount}
        onChange={setAmount}
        min={0.1}
        step={0.1}
      />
      <Button
        isDisabled={!address || !amount}
        onPress={async () => {
          dispatch({ type: 'SET_LOADING', loading: true });

          transferSol({ address, amount })
            .then((transaction) => {
              addTransactionToDB(transaction)
                .then(() => {
                  openModal(
                    <p className={styles.modalMessage}>
                      The transfer is successful.
                      <br />
                      See the transaction on <SolScanLink signature={transaction.signature} />
                    </p>,
                  );
                })
                .catch((e) => console.log(e?.message));
            })
            .catch((e) => {
              openModal(
                <p className={cn(styles.modalMessage, styles.errorMessage)}>
                  {e?.message || 'An error occured'}
                </p>,
              );
            });
        }}
      >
        Send
      </Button>
      <Modal isDismissable state={modalState}>
        {modalMessage}
        <Button onPress={modalState.close}>Close</Button>
      </Modal>
    </form>
  );
};

export default Home;
