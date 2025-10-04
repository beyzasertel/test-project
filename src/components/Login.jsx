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
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Anlık validation
    if (name === "email") {
      if (!value) {
        setErrorMessage("Email alanı boş olamaz!");
      } else if (!isValidEmail(value)) {
        setErrorMessage("Lütfen geçerli bir e-posta adresi girin!");
      } else {
        setErrorMessage("");
      }
    }

    if (name === "password") {
      if (!value) {
        setErrorMessage("Lütfen şifrenizi girin.");
      } else if (!isStrongPassword(value)) {
        setErrorMessage(
          "Şifre en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermelidir."
        );
      } else {
        setErrorMessage("");
      }
    }

    if (name === "terms" && !checked) {
      setErrorMessage("Kullanım koşullarını kabul etmelisiniz.");
    } else if (name === "terms" && checked) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Eğer frontend validation'da hata varsa submit etme
    if (errorMessage || !form.email || !form.password || !form.terms) {
      return;
    }

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
        setErrorMessage("Email veya şifre hatalı!");
      }
    } catch (err) {
      setErrorMessage("Sunucuya bağlanırken hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>

        <Form onSubmit={handleSubmit} data-cy="login-form">
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              id="exampleEmail"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={form.email}
              data-cy="email-input"
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={form.password}
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
            <p className="text-sm text-red-600 mb-3" data-cy="error-msg">
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
      </div>
    </div>
  );
}
