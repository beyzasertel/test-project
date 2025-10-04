// src/components/Login.jsx
import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialForm = { email: "", password: "", terms: false };

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isStrongPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
    password
  );

export default function Login() {
  const [form, setForm] = useState(initialForm);

  // 3 ayrı error message state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Typing sırasında validation
    if (name === "email") {
      if (!value) setEmailError("Email alanı boş olamaz!");
      else if (!isValidEmail(value))
        setEmailError("Lütfen geçerli bir e-posta adresi girin!");
      else setEmailError("");
    }

    if (name === "password") {
      if (!value) setPasswordError("Lütfen şifrenizi girin.");
      else if (!isStrongPassword(value))
        setPasswordError(
          "Şifre en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermelidir."
        );
      else setPasswordError("");
    }

    if (name === "terms") {
      if (!checked) setTermsError("Kullanım koşullarını kabul etmelisiniz.");
      else setTermsError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      emailError ||
      passwordError ||
      termsError ||
      !form.email ||
      !form.password ||
      !form.terms
    )
      return;

    setLoading(true);

    try {
      const res = await axios.get(
        "https://6540a96145bedb25bfc247b4.mockapi.io/api/login"
      );
      const user = res.data.find(
        (item) => item.password === form.password && item.email === form.email
      );

      if (user) {
        setForm(initialForm);
        navigate("/main");
      } else {
        setEmailError("Email veya şifre hatalı!");
      }
    } catch (err) {
      setEmailError("Sunucuya bağlanırken hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

        <Form onSubmit={handleSubmit} data-cy="login-form">
          {/* Email */}
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              id="exampleEmail"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              onBlur={handleChange}
              value={form.email}
              data-cy="email-input"
            />
            {emailError && (
              <p className="text-red-600 text-sm mt-1" data-cy="email-error">
                {emailError}
              </p>
            )}
          </FormGroup>

          {/* Password */}
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              onBlur={handleChange}
              value={form.password}
              data-cy="password-input"
            />
            {passwordError && (
              <p className="text-red-600 text-sm mt-1" data-cy="password-error">
                {passwordError}
              </p>
            )}
          </FormGroup>

          {/* Terms */}
          <FormGroup check className="flex items-center space-x-2 my-3">
            <Input
              id="terms"
              name="terms"
              type="checkbox"
              onChange={handleChange}
              checked={form.terms}
              data-cy="terms-checkbox"
            />
            <Label for="terms" className="mb-0 select-none text-sm">
              I agree to terms of service and privacy policy
            </Label>
            {termsError && (
              <p className="text-red-600 text-sm mt-1" data-cy="terms-error">
                {termsError}
              </p>
            )}
          </FormGroup>

          <FormGroup className="text-center p-4">
            <Button
              type="submit"
              color="primary"
              disabled={!form.terms || loading || emailError || passwordError}
              className="w-full rounded-md"
              data-cy="submit-btn"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
