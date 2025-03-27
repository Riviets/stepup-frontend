import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MessageModal from "../layout/MessageModal";
import { habitsService } from "../../services/habitsService";
import { useTranslation } from "react-i18next";

export default function EditHabit() {
  const { t } = useTranslation();
  const defaultValues = { text: "", xp: "", currency: "" };
  const [habitValues, setHabitValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function editHabit() {
      if (isSubmit && Object.keys(formErrors).length === 0) {
        try {
          const response = await habitsService.editUserHabit(params.id, habitValues);
          setHabitValues(defaultValues);
          setIsSubmit(false);
          setMessage(t('editHabit.habitEdited'));
          setIsModalOpen(true);
        } catch (error) {
          setError(error);
        }
      }
    }
    editHabit();
  }, [isSubmit, formErrors]);

  useEffect(() => {
    async function getHabitInfo() {
      try {
        if (params) {
          const response = await habitsService.getHabitInfoById(params.id);
          const habitData = response.data;
          const { name: text, xp, currency } = habitData;
          setHabitValues({ text, xp, currency });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getHabitInfo();
  }, [params]);

  function handleChange(event) {
    const { name, value } = event.target;
    setHabitValues({ ...habitValues, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validate(habitValues);
    setFormErrors(errors);
    setIsSubmit(true);
  }

  function validate(values) {
    const errors = {};
    const { text, xp, currency } = values;

    if (!text) {
      errors.text = t('editHabit.errors.textRequired');
    } else if (text.length <= 3) {
      errors.text = t('editHabit.errors.textTooShort');
    } else if (text.length >= 60) {
      errors.text = t('editHabit.errors.textTooLong');
    }

    if (!xp) {
      errors.xp = t('editHabit.errors.xpRequired');
    } else if (Number(xp) >= 15) {
      errors.xp = t('editHabit.errors.xpTooHigh');
    } else if (Number(xp) <= 0) {
      errors.xp = t('editHabit.errors.xpTooLow');
    }

    if (!currency) {
      errors.currency = t('editHabit.errors.currencyRequired');
    } else if (Number(currency) > 10) {
      errors.currency = t('editHabit.errors.currencyTooHigh');
    } else if (Number(currency) < 0) {
      errors.currency = t('editHabit.errors.currencyNegative');
    }

    return errors;
  }

  if (error) {
    return (<div className="text-red-500 flex items-center justify-center">{error.message}</div>);
  }

  return (
    <div className="px-[50px] pt-[60px]">
      <button
        className="bg-white px-8 py-1 border-3 border-[#483D61] font-bold rounded-lg mb-[20px]"
        onClick={() => navigate(-1)}
      >
        {t('editHabit.goBack')}
      </button>
      <div className="bg-[#D9D9D9] w-[100%] max-w-[330px] border-2 border-[#483D61] rounded-lg py-10 px-8">
        <p className="text-center text-2xl font-black mb-5">{t('editHabit.title')}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="form-item">
            <label className="text-lg font-semibold" htmlFor="text">{t('editHabit.habitTextLabel')}</label>
            <input
              className="input"
              type="text"
              placeholder={t('editHabit.placeholder.habitText')}
              name="text"
              id="text"
              value={habitValues.text}
              onChange={handleChange}
            />
            {formErrors.text && <div className="text-red-500">{formErrors.text}</div>}
          </div>
          <div className="form-item">
            <label className="text-lg font-semibold" htmlFor="xp">{t('editHabit.xpLabel')}</label>
            <input
              className="input"
              type="number"
              placeholder={t('editHabit.placeholder.xp')}
              name="xp"
              id="xp"
              value={habitValues.xp}
              onChange={handleChange}
            />
            {formErrors.xp && <div className="text-red-500">{formErrors.xp}</div>}
          </div>
          <div className="form-item mb-5">
            <label className="text-lg font-semibold" htmlFor="currency">{t('editHabit.currencyLabel')}</label>
            <input
              className="input"
              type="number"
              placeholder={t('editHabit.placeholder.currency')}
              name="currency"
              id="currency"
              value={habitValues.currency}
              onChange={handleChange}
            />
            {formErrors.currency && <div className="text-red-500">{formErrors.currency}</div>}
          </div>
          <button type="submit" className="bg-[#483D61] text-white py-2 rounded-lg text-xl font-bold">
            {t('editHabit.submit')}
          </button>
        </form>
      </div>
      {isModalOpen && <MessageModal message={message} onClose={() => { setIsModalOpen(false); navigate(-1); }} />}
    </div>
  );
}