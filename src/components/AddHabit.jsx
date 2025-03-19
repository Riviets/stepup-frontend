import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageModal from "./MessageModal";

export default function AddHabit() {
    const defaultValues = { text: "", xp: "", currency: "" };
    const [habitValues, setHabitValues] = useState(defaultValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (isSubmit && Object.keys(formErrors).length === 0) {
            setHabitValues(defaultValues);
            setIsSubmit(false);
            setIsModalOpen(true)
        }
    }, [isSubmit, formErrors]);

    function handleChange(event) {
        const { name, value } = event.target;
        setHabitValues({ ...habitValues, [name]: value }); 
    }

    function handleSubmit(event) {
        event.preventDefault();
        const errors = validate(habitValues);
        setFormErrors(errors);
        setIsSubmit(true)
    }

    function validate(values) {
        const errors = {};
        const { text, xp, currency } = values;

        if (!text) {
            errors.text = 'Enter habit text!';
        } else if (text.length <= 3) {
            errors.text = 'Habit text should be longer than 3 symbols';
        } else if (text.length >= 60) {
            errors.text = 'Habit text should not be longer than 60 symbols';
        }

        if (!xp) {
            errors.xp = 'Enter habit XP!';
        } else if (Number(xp) >= 15) {
            errors.xp = 'XP can not be more than 15 for custom habits';
        } else if (Number(xp) <= 0) {
            errors.xp = 'XP must be greater than 0';
        }

        if (!currency) {
            errors.currency = 'Enter habit currency!';
        } else if (Number(currency) >= 10) {
            errors.currency = 'Currency can not be more than 10 for custom habits';
        } else if (Number(currency) < 0) {
            errors.currency = 'Currency cannot be negative';
        }

        return errors;
    }

    return (
        <div className="px-[50px] pt-[60px]">
            <button
                className="bg-white px-8 py-1 border-3 border-[#483D61] font-bold rounded-lg mb-[20px]"
                onClick={() => navigate(-1)}>
                Go Back
            </button>
            <div className="bg-[#D9D9D9] w-[100%] max-w-[330px] border-2 border-[#483D61] rounded-lg py-10 px-8">
                <p className="text-center text-2xl font-black mb-5">Add Habit</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="form-item">
                        <label className="text-lg font-semibold" htmlFor="text">Habit Text:</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Habit Text"
                            name="text"
                            id="text"
                            value={habitValues.text}
                            onChange={handleChange}
                        />
                        {formErrors.text && <div className="text-red-500">{formErrors.text}</div>}
                    </div>
                    <div className="form-item">
                        <label className="text-lg font-semibold" htmlFor="xp">XP:</label>
                        <input
                            className="input"
                            type="number"
                            placeholder="XP per habit"
                            name="xp"
                            id="xp"
                            value={habitValues.xp}
                            onChange={handleChange}
                        />
                        {formErrors.xp && <div className="text-red-500">{formErrors.xp}</div>}
                    </div>
                    <div className="form-item mb-5">
                        <label className="text-lg font-semibold" htmlFor="currency">Currency:</label>
                        <input
                            className="input"
                            type="number"
                            placeholder="Currency per habit"
                            name="currency"
                            id="currency"
                            value={habitValues.currency}
                            onChange={handleChange}
                        />
                        {formErrors.currency && <div className="text-red-500">{formErrors.currency}</div>}
                    </div>
                    <button type="submit" className="bg-[#483D61] text-white py-2 rounded-lg text-xl font-bold">
                        Submit
                    </button>
                </form>
            </div>
            {isModalOpen && <MessageModal message={'Habbit added!'} onClose={()=>{setIsModalOpen(false); navigate(-1)
}} />}
        </div>
    );
}