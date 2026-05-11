import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { mapServerErrors, type ServerValidationError } from './mapServerErrors';

const duplicateEmailError: ServerValidationError = {
  code: 'VALIDATION_FAILED',
  message: '입력값을 다시 확인해 주세요.',
  errors: [
    { field: 'email', message: '이미 가입된 이메일입니다.' },
    { field: 'teamName', message: '팀 이름은 2자 이상이어야 합니다.' },
  ],
};

export default function ServerErrorMappingExample() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function submit() {
    const mappedErrors = mapServerErrors(duplicateEmailError);
    setFieldErrors(mappedErrors.fieldErrors);
    setFormError(mappedErrors.formError);
  }

  function clear() {
    setFieldErrors({});
    setFormError(null);
  }

  return (
    <Card title="서버 오류 매핑" eyebrow="폼과 검증 / 좋은 예">
      <p>서버 validation 응답을 필드 오류와 폼 전체 오류로 나눠 사용자가 고칠 위치에 표시합니다.</p>

      <div className="demo-box">
        {formError ? <p className="field-error">{formError}</p> : null}

        <div className="field">
          <label htmlFor="email">이메일</label>
          <input id="email" className={fieldErrors.email ? 'error' : ''} defaultValue="seoyeon@example.com" />
          {fieldErrors.email ? <span className="field-error">{fieldErrors.email}</span> : null}
        </div>

        <div className="field">
          <label htmlFor="teamName">팀 이름</label>
          <input id="teamName" className={fieldErrors.teamName ? 'error' : ''} defaultValue="A" />
          {fieldErrors.teamName ? <span className="field-error">{fieldErrors.teamName}</span> : null}
        </div>

        <div className="demo-row">
          <Button onClick={submit}>서버 오류 적용</Button>
          <Button className="button secondary" onClick={clear}>초기화</Button>
        </div>
      </div>
    </Card>
  );
}
