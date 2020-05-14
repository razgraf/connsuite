import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Router from "next/router";
import Link from "next/link";
import { darken } from "polished";

import Title from "./Title";
import { types, useDesigner } from "./designer";

const wrapperCss = css`
  ${props => props.theme.flexRowNoWrap};
  align-items: center;
  background-color: ${props => props.theme.lavenderGray};
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-height: 20px;
  padding: 15px 25px;
  position: relative;

  ${props =>
    props.shared.isDisabled &&
    css`
      cursor: not-allowed;
      filter: grayscale(100%);
      user-select: none;
      &:active {
        pointer-events: none;
      }
    `}

  ${props =>
    (props.shared.isDisabledSoft || props.isLoading) &&
    css`
      cursor: not-allowed !important;
      user-select: none;
      &:active {
        pointer-events: none;
      }
    `}

  ${props =>
    props.shared.isMini &&
    css`
      min-height: 30px;
      padding: 10px 20px;
    `};

  ${props =>
    props.shared.isFullWidth &&
    css`
      width: 100%;
    `};

  @media all and (max-width: ${props => props.theme.medias.medium}){
    padding: 15px 10px;
    ${props =>
      props.isMini &&
      css`
        padding: 8px 15px;
      `};
  }

 ${props => {
   const { design } = props.shared;

   const color = css`
     color: ${_.get(design, "color") || props.theme.white};
     &:hover,
     &:active {
       ${_.has(design, "colorHover") && `color: ${_.get(design, "colorHover")}; transition: color 250ms;`}
     }
   `;

   switch (design.appearance) {
     case types.button.appearance.outline:
     case types.button.appearance.transparent:
     case types.button.appearance.solid:
       return css`
         ${color}
         ${design.border && `border: 1px solid ${design.border};`}
         ${design.shadow && `box-shadow: ${design.shadow};`}
         ${design.background && `background: ${design.background};`}
         transition: background 250ms, box-shadow 250ms, border 250ms, color 250ms;
         &:hover {
          ${design.borderHover && `border: 1px solid ${design.borderHover};`}
           ${design.shadowHover && `box-shadow: ${design.shadowHover};`}
           ${
             (design.backgroundHover && `background: ${design.backgroundHover};`) ||
             (design.background && `background: ${darken(0.1, design.background)};`)
           } 
            transition: background 250ms, box-shadow 250ms, border 250ms, color 250ms;
         }
       `;
     case types.button.appearance.gradient:
       return css`
         ${color}
         ${design.background};
         background-position-y: 0%;
         background-position-x: 0%;
         background-size: 100% 100%;
         transition: background-size 250ms;

         &:hover {
           background-size: 200% 100%;
           transition: background-size 250ms;
         }
         ${props.shared.isLoading &&
         css`
           background-size: 200% 100%;
           transition: background-size 250ms;
         `}
       `;
     default:
       return css``;
   }
 }};
`;

const LinkWrapper = styled.a`
  ${wrapperCss};
`;

const ButtonWrapper = styled.div`
  ${wrapperCss};
`;

const LoaderWrapper = styled.div`
  position: absolute;
  right: 1rem;
`;

/**
 *
 * @param {string} title
 */
function Button({
  accent: rawAccent,
  appearance: rawAppearance,
  className,
  children,
  childrenLeft,
  childrenRight,
  isDisabled,
  isDisabledSoft,
  isFullWidth,
  isLoading,
  isMini,
  onClick,
  target,
  title,
  titleMedium,
  titleShort,
  to,
  type: rawType,
  ...otherProps
}) {
  const appearance = useMemo(() => (_.isFunction(rawAppearance) ? rawAppearance(types.button.appearance) : _.toString(rawAppearance)), [
    rawAppearance,
  ]);
  const accent = useMemo(() => (_.isFunction(rawAccent) ? rawAccent(types.button.accent) : _.toString(rawAccent)), [rawAccent]);
  const type = useMemo(() => (_.isFunction(rawType) ? rawType(types.button.type) : _.toString(rawType)), [rawType]);

  const design = useDesigner(accent, appearance);

  const sharedProps = {
    design,
    isDisabled,
    isDisabledSoft,
    isFullWidth,
    isLoading,
    isMini,
  };
  const titleProps = {
    title,
    design,
    titleMedium,
    titleShort,
    isMini,
  };

  const renderLoader = useCallback(() => {
    return isLoading ? (
      <LoaderWrapper {...otherProps} data-component="loader">
        <p>...</p>
      </LoaderWrapper>
    ) : (
      <></>
    );
  }, [isLoading, otherProps]);

  const renderBody = useCallback(
    parent => {
      return (
        <>
          {childrenLeft}
          <Title {...titleProps} design={design} parent={parent} />
          {childrenRight}
          {renderLoader()}
        </>
      );
    },
    [childrenLeft, childrenRight, design, titleProps, renderLoader],
  );

  const onFinalClick = useCallback(
    e => {
      if (isDisabled || isDisabledSoft) {
        e.preventDefault();
      } else {
        onClick(e);
        if (type === types.button.type.router) {
          Router.push(to);
        }
      }
    },
    [isDisabled, isDisabledSoft, onClick, to, type],
  );

  switch (type) {
    case types.button.type.link:
      return (
        <LinkWrapper
          data-disabled={isDisabled || isDisabledSoft}
          className={className}
          shared={sharedProps}
          href={to}
          onClick={onFinalClick}
          rel="noopener noreferrer"
          target={target}
        >
          {renderBody(LinkWrapper)}
        </LinkWrapper>
      );
    case types.button.type.routerDecorator:
      return (
        <Link href={to}>
          <div data-disabled={isDisabled || isDisabledSoft} className={className}>
            {children}
          </div>
        </Link>
      );
    case types.button.type.router:
      return (
        <Link href={to}>
          <ButtonWrapper data-disabled={isDisabled || isDisabledSoft} className={className} shared={sharedProps} onClick={onFinalClick}>
            {renderBody(ButtonWrapper)}
          </ButtonWrapper>
        </Link>
      );

    default:
      return (
        <ButtonWrapper data-disabled={isDisabled || isDisabledSoft} className={className} shared={sharedProps} onClick={onFinalClick}>
          {renderBody(ButtonWrapper)}
        </ButtonWrapper>
      );
  }
}

Button.propTypes = {
  /**
   * Returns the chosen type from the list of available types
   * @name ValueGenerator
   * @function
   * @param {object} t Source object of types
   * @returns {string} Type
   */

  /**
   * @param {string|ValueGenerator} accent The primary color or accent of the button design.
   * Either a string or a function that will receive the possible types as an argument and return the chosen value.
   */
  accent: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(Object.keys(types.button.accent))]),

  /**
   * @param {string|ValueGenerator} appearance The shape given to the button design.
   * Either a string or a function that will receive the possible types as an argument and return the chosen value.
   */
  appearance: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(Object.keys(types.button.appearance))]),
  childrenLeft: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /**
   * @param {object} className Additional classNames for out-of-scope styling
   */
  childrenRight: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isDisabledSoft: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMini: PropTypes.bool,
  onClick: PropTypes.func,
  target: PropTypes.string,
  /**
   * @param {string|object} title Default title for the button
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**
   * @param {string|object} titleShort Adaptation of the title for small screens. Empty string will hide the title on small screens
   */
  titleShort: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**
   * @param {string|object} titleMedium Adaptation of the title for medium screens. Empty string will hide the title on medium screens
   */
  titleMedium: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  to: PropTypes.string,
  /**
   * @param {string|ValueGenerator} type The type/behaviour of the button (router, _blank anchor, ...)
   * Either a string or a function that will receive the possible types as an argument and return the chosen value.
   */
  type: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(Object.keys(types.button.type))]),
};

Button.defaultProps = {
  accent: types.button.accent.primary,
  appearance: types.button.appearance.outline,
  childrenLeft: null,
  childrenRight: null,
  className: null,
  isDisabled: false,
  isDisabledSoft: false,
  isFullWidth: false,
  isLoading: false,
  isMini: false,
  onClick: () => {},
  target: "_blank",
  title: "",
  titleShort: null,
  titleMedium: null,
  to: "",
  type: types.button.type.button,
};

export default Button;
