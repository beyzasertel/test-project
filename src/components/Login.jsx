// src/components/Login.jsx
import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

// Email doğrulama
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Strong password doğrulama
const isStrongPassword = (password) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return strongPasswordRegex.test(password);
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Kullanıcı yazarken hata mesajını temizle
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Email kontrolü
    if (!isValidEmail(form.email)) {
      setErrorMessage("Lütfen geçerli bir e-posta adresi girin!");
      return;
    }

    // Password kontrolü
    if (!form.password) {
      setErrorMessage("Lütfen şifrenizi girin.");
      return;
    }

    if (!isStrongPassword(form.password)) {
      setErrorMessage(
        "Şifre en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermelidir."
      );
      return;
    }

    // Checkbox kontrolü
    if (!form.terms) {
      setErrorMessage("Kullanım koşullarını kabul etmelisiniz.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

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
        navigate("/error");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Sunucuya bağlanırken hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

        <Form onSubmit={handleSubmit} data-cy="login-form">
          <FormGroup>
            <Label
              for="exampleEmail"
              className="block text-sm font-medium mb-1"
            >
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Enter your email"
              type="email"
              onChange={handleChange}
              value={form.email}
              className="form-input w-full rounded-md border-gray-300 p-2"
              data-cy="email-input"
            />
          </FormGroup>

          <FormGroup>
            <Label
              for="examplePassword"
              className="block text-sm font-medium mb-1"
            >
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Enter your password"
              type="password"
              onChange={handleChange}
              value={form.password}
              className="form-input w-full rounded-md border-gray-300 p-2"
              data-cy="password-input"
            />
          </FormGroup>

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
          </FormGroup>

          {errorMessage && (
            <p className="error text-sm text-red-600 mb-3" data-cy="error-msg">
              {errorMessage}
            </p>
          )}

          <FormGroup className="text-center p-4">
            <Button
              type="submit"
              color="primary"
              disabled={!form.terms || loading}
              className="w-full rounded-md"
              data-cy="submit-btn"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </FormGroup>
        </Form>

        <div className="text-xs text-center text-gray-500 mt-2">
          <span>Don't have an account? </span>
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
