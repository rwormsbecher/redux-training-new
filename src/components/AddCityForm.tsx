import React, { useState, ChangeEvent, FormEvent } from "react";
import * as Yup from "yup";

interface FormValues {
	title: string;
	image: string;
	description: string;
}

const AddCityForm: React.FC<{ handleMode: (mode: string) => void }> = ({ handleMode }) => {
	const [values, setValues] = useState<FormValues>({
		title: "",
		image: "",
		description: "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = (values: FormValues): Record<string, string> => {
		const validationSchema = Yup.object().shape({
			title: Yup.string().min(2, "You must at least use 2 characters.").required("You must enter a title."),
		});

		try {
			validationSchema.validateSync(values, { abortEarly: false });
			return {};
		} catch (err) {
			const validationErrors = err as Yup.ValidationError;
			return validationErrors.inner.reduce(
				(errors: Record<string, string>, error: Yup.ValidationError) => ({
					...errors,
					[error.path!]: error.message,
				}),
				{}
			);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			console.log("Form values:", values);
			// Add your form submission logic here
		}
	};

	return (
		<div className="sign-up-form">
			<form onSubmit={handleSubmit}>
				<label htmlFor="title" style={{ display: "block" }}>
					<span className="input-feedback">*</span> Title :
				</label>
				{errors.title && <div className="input-feedback">{errors.title}</div>}
				<input
					id="title"
					name="title"
					placeholder="Enter a title"
					type="text"
					value={values.title}
					onChange={handleChange}
					className={errors.title ? "text-input error" : "text-input"}
					autoFocus={true}
				/>

				<label htmlFor="image" style={{ display: "block" }}>
					Image:
				</label>
				<input
					id="image"
					name="image"
					placeholder="Enter an image"
					type="text"
					value={values.image}
					onChange={handleChange}
					className={"text-input"}
				/>

				<label htmlFor="description" style={{ display: "block" }}>
					Description
				</label>
				<input
					id="description"
					name="description"
					placeholder="Enter your description"
					type="text"
					value={values.description}
					onChange={handleChange}
					className={"text-input"}
				/>

				<button type="submit" className="btn btn-primary teams-submit-button">
					Add city
				</button>
				<button
					type="button"
					className="btn btn-cancel"
					onClick={() => handleMode("showcase")} // Replace with your cancel logic
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default AddCityForm;
