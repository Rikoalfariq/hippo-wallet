import { Form } from 'components/Antd';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import { faucetClient } from 'config/aptosClient';
import { useFormik } from 'formik';
import useAptosWallet from 'hooks/useAptosWallet';
import { useState } from 'react';
import { createNewAccount } from 'utils/aptosUtils';
import * as yup from 'yup';

interface TFormProps {
  walletName: string;
}

interface TProps {
  onSuccess: () => void;
}

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const createWalletSchema = yup.object({
  walletName: yup.string().required()
});

const AddNewWallet: React.FC<TProps> = ({ onSuccess }) => {
  const [isAccountBeingCreated, setIsAccountBeingCreated] = useState<boolean>(false);
  const { addAccount, aptosWalletAccounts } = useAptosWallet();

  const onSubmit = async (values: TFormProps) => {
    try {
      const { walletName } = values;
      if (aptosWalletAccounts.find((wallet) => wallet.walletName.includes(walletName))) {
        formik.setFieldError('walletName', 'Wallet name is used');
        return false;
      }
      setIsAccountBeingCreated(true);
      const account = createNewAccount();
      await faucetClient.fundAccount(account.address(), 0);
      await addAccount(walletName, account);
      setIsAccountBeingCreated(false);
      onSuccess();
    } catch (error) {
      console.log('create new wallet error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      walletName: `Wallet${aptosWalletAccounts.length + 1}`
    },
    validationSchema: createWalletSchema,
    onSubmit
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={formik.handleSubmit}>
      <h4 className="text-grey-100 font-bold">Add New Wallet</h4>
      <Form.Item
        {...formItemLayout}
        className="w-full"
        label="Wallet Name"
        validateStatus={formik.errors.walletName ? 'error' : ''}
        help={formik.errors.walletName}>
        <TextInput
          name="walletName"
          value={formik.values.walletName}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <div className="flex w-full justify-between mt-20 gap-2">
        <Button variant="outlined" className="w-full font-bold" onClick={onSuccess}>
          Cancel
        </Button>
        <Button isLoading={isAccountBeingCreated} type="submit" className="w-full font-bold">
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default AddNewWallet;
