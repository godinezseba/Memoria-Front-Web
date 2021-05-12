import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `loading={true}`. */
  loading: {},
  /* Styles applied to the loadingIndicator element. */
  loadingIndicator: {
    position: 'absolute',
    visibility: 'visible',
    display: 'flex',
  },
  /* Styles applied to the loadingIndicator element if `loadingPosition="center"`. */
  loadingIndicatorCenter: {
    left: '50%',
    transform: 'translate(-50%)',
  },
  /* Styles applied to the loadingIndicator element if `loadingPosition="start"`. */
  loadingIndicatorStart: {
    left: 14,
  },
  /* Styles applied to the loadingIndicator element if `loadingPosition="end"`. */
  loadingIndicatorEnd: {
    right: 14,
  },
  /* Styles applied to the endIcon element if `loading={true}` and `loadingPosition="end"`. */
  endIconLoadingEnd: {
    visibility: 'hidden',
  },
  /* Styles applied to the startIcon element if `loading={true}` and `loadingPosition="start"`. */
  startIconLoadingStart: {
    visibility: 'hidden',
  },
  /* Styles applied to the label element if `loading={true}` and `loadingPosition="center"`. */
  labelLoadingCenter: {
    visibility: 'hidden',
  },
});

const LoadingIndicator = <CircularProgress color="inherit" size={16} />;

// this component is from @material-ui/lab@5.0.0-alpha
// https://github.com/mui-org/material-ui/tree/next/packages/material-ui-lab/src/LoadingButton
// https://github.com/mui-org/material-ui/blob/next/LICENSE
// this package use @material-ui/core@5.0.0, so @MUI/lab break the style
// in this proyect, because this proyect use MU/core@4.0.0, thats why I copy/paste the code to my proyect
const LoadingButton = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    className,
    disabled,
    loading,
    loadingIndicator,
    loadingPosition,
    ...other
  } = props;

  return (
    <Button
      className={clsx(
        classes.root,
        {
          [classes.loading]: loading,
        },
        className,
      )}
      disabled={disabled || loading}
      ref={ref}
      classes={{
        startIcon: classes[`startIcon${loading ? 'Loading' : ''}${capitalize(loadingPosition)}`],
        endIcon: classes[`endIcon${loading ? 'Loading' : ''}${capitalize(loadingPosition)}`],
        label: classes[`label${loading ? 'Loading' : ''}${capitalize(loadingPosition)}`],
      }}
      {...other}
    >
      {loading && (
        <div
          className={clsx(
            classes.loadingIndicator,
            classes[`loadingIndicator${capitalize(loadingPosition)}`],
          )}
        >
          {loadingIndicator}
        </div>
      )}

      {children}
    </Button>
  );
});

LoadingButton.propTypes /* remove-proptypes */ = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    loading: PropTypes.string,
    loadingIndicator: PropTypes.string,
  }),
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the loading indicator is shown.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: chainPropTypes(PropTypes.oneOf(['start', 'end', 'center']), (props) => {
    if (props.loadingPosition === 'start' && !props.startIcon) {
      return new Error(
        `Material-UI: The loadingPosition="start" should be used in combination with startIcon.`,
      );
    }
    if (props.loadingPosition === 'end' && !props.endIcon) {
      return new Error(
        `Material-UI: The loadingPosition="end" should be used in combination with endIcon.`,
      );
    }
    return null;
  }),
};

LoadingButton.defaultProps = {
  children: () => {},
  classes: {},
  className: '',
  disabled: false,
  loading: false,
  loadingIndicator: LoadingIndicator,
  loadingPosition: 'center',
}

export default withStyles(styles, { name: 'MuiLoadingButton' })(LoadingButton);
