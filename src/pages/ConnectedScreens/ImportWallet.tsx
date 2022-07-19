import { Form } from 'components/Antd';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import { useFormik } from 'formik';
import useAptosWallet from 'hooks/useAptosWallet';
import { importAccount } from 'utils/aptosUtils';
import * as yup from 'yup';

interface TFormProps {
  privateKey: string;
  walletName: string;
}

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const importWalletSchema = yup.object({
  privateKey: yup.string().required(),
  walletName: yup.string().required()
});

interface TProps {
  onSuccess: () => void;
}

const ImportWallet: React.FC<TProps> = ({ onSuccess }) => {
  const { aptosWalletAccounts, addAccount } = useAptosWallet();

  const onSubmit = async (values: TFormProps) => {
    try {
      const { privateKey, walletName } = values;
      const account = importAccount(privateKey);
      await addAccount(walletName, account);
      onSuccess();
    } catch (error) {
      console.log('import wallet error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      privateKey: '',
      walletName: `Wallet${aptosWalletAccounts.length + 1}`
    },
    validationSchema: importWalletSchema,
    onSubmit
  });

  return (
    <form className="flex flex-col" onSubmit={formik.handleSubmit}>
      {/* <h4 className="text-grey-900 font-bold">Import Wallet</h4> */}
      <Form.Item
        {...formItemLayout}
        className="w-full"
        label={<span className="font-bold text-lg text-grey-100">Your Wallet Name</span>}
        validateStatus={formik.errors.walletName ? 'error' : ''}
        help={formik.errors.walletName}>
        <TextInput
          name="walletName"
          value={formik.values.walletName}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        className="w-full"
        label={<span className="font-bold text-lg text-grey-100">Private Key</span>}
        validateStatus={formik.errors.privateKey ? 'error' : ''}
        help={formik.errors.privateKey}>
        <TextInput
          name="privateKey"
          placeholder="Private key"
          value={formik.values.privateKey}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <div className="flex w-full justify-between mt-40 gap-4">
        <Button variant="outlined" className="w-full font-bold" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" className="w-full font-bold">
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default ImportWallet;
