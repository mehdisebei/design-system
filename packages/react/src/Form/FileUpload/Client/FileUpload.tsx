import { ComponentPropsWithRef } from "react";
import "@axa-fr/design-system-css/dist/Form/FileUpload/Client/FileUpload.client.scss";
import visibility from "@material-symbols/svg-400/outlined/visibility-fill.svg";
import close from "@material-symbols/svg-400/outlined/close-fill.svg";
import check from "@material-symbols/svg-400/outlined/check_circle-fill.svg";
import error from "@material-symbols/svg-400/outlined/error-fill.svg";
import errorO from "@material-symbols/svg-400/outlined/error.svg";
import plus from "@material-symbols/svg-400/outlined/add_circle-fill.svg";
import classNames from "classnames";
import { Svg } from "../../../Svg";
import { Loader } from "../../../Loader/Client";
import { Button } from "../../../client";
import { Variants } from "../../../Button/Button.client";

function getReadableFileSizeString(fileSizeInBytes: number) {
  let i = -1;
  let fileSizeInBytesCopy = fileSizeInBytes;
  const byteUnits = [" Ko", " Mo", " Go"];
  do {
    fileSizeInBytesCopy /= 1024;
    i += 1;
  } while (fileSizeInBytesCopy > 1024);

  return Math.max(fileSizeInBytesCopy, 0.1).toFixed(1) + byteUnits[i];
}

type Props = Omit<ComponentPropsWithRef<"input">, "required"> & {
  id: string;
  label?: string;
  buttonLabel?: string;
  dropzoneDescription?: string;
  instructions?: string;
  required?: boolean;
  errors: Array<{
    id?: string | undefined;
    message: string;
  }>;
  files: Array<{
    id: string;
    name: string;
    size: number;
    isLoading: boolean;
  }>;
  accept: string;
  isMobile?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const FileUpload = ({ ...otherProps }: Props) => {
  const {
    id,
    label,
    buttonLabel,
    instructions,
    dropzoneDescription,
    required,
    files,
    accept,
    errors,
    isMobile,
    onChange,
    onView,
    onDelete,
  } = otherProps;

  const getIcon = (isInError: boolean, isLoading: boolean) => {
    if (isInError) {
      return (
        <Svg src={error} className="af-form__file-title-container-icon-error" />
      );
    }
    if (isLoading) {
      return <Loader size={18} border={2} />;
    }
    return (
      <Svg src={check} className="af-form__file-title-container-icon-success" />
    );
  };

  return (
    <>
      <label className="af-form__group--label" htmlFor={id}>
        {label} {required ? "*" : ""}
      </label>
      <div
        className={classNames(
          "af-form__file-input",
          (isMobile || !dropzoneDescription) && "is-mobile",
        )}
      >
        <input
          id={id}
          onChange={onChange}
          accept={accept}
          type="file"
          name="file-input"
        />
        {dropzoneDescription && (
          <div className="af-form__file-input-dropdown-text">
            <p>{dropzoneDescription}</p>
            <p>ou</p>
          </div>
        )}
        <Button
          variant={Variants.tertiary}
          onClick={() => document.getElementById(id)?.click()}
          iconLeft={<Svg src={plus} className="af-form__file-input-icon" />}
        >
          {buttonLabel}
        </Button>
      </div>
      <small className="af-form__file-input-help">{instructions}</small>
      <div className="custom-table-file af-file-table">
        <ul className="af-form__file-list">
          {files.map(({ id: fileId, name, size, isLoading }) => {
            const effectiveSize = getReadableFileSizeString(size);

            const isInError = errors.some(
              (fileError) => fileError.id === fileId,
            );

            const errorMessage = errors.find(
              (fileError) => fileError.id === fileId,
            )?.message;

            return (
              <>
                <li
                  key={fileId}
                  className={`af-form__file-line ${isInError ? "af-form__file-line--error" : ""}`}
                >
                  <div className="af-form__file-title-container">
                    {getIcon(isInError, isLoading)}
                    <div className="af-form__file-title">
                      <span className="af-form__file-name">{name}</span>
                      <span className="af-form__file-size">
                        {effectiveSize}
                      </span>
                    </div>
                  </div>
                  <div className="af-form__file-actions">
                    {onView && (
                      <Svg
                        tabIndex={0}
                        onClick={() => onView(fileId)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            onView(fileId);
                          }
                        }}
                        className="af-form__file-actions-icon"
                        src={visibility}
                      />
                    )}
                    {onDelete && (
                      <Svg
                        tabIndex={0}
                        onClick={() => onDelete(fileId)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            onDelete(fileId);
                          }
                        }}
                        className="af-form__file-actions-icon"
                        src={close}
                      />
                    )}
                  </div>
                </li>
                {isInError && (
                  <small className="af-form__file-error">
                    <Svg
                      src={errorO}
                      className="af-form__file-error-icon"
                      width={18}
                    />
                    {errorMessage}
                  </small>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

FileUpload.displayName = "FileUpload";

export { FileUpload };
